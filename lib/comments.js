import mongoose from "mongoose";
import createHttpError from "http-errors";
import { CommentModel } from "./models/Comment";
import { copyObject, calculateDateDuration } from "./utils";
import { getStorageFileUrl } from "./upload";

const ObjectId = mongoose.Types.ObjectId;

export async function findCommentById(id) {
  const commentFindResult = await CommentModel.aggregate([
    {
      $project: {
        answers: {
          $concatArrays: [
            "$answers",
            [
              {
                _id: "$_id",
                openToComment: "$openToComment",
                content: "$content",
                status: "$status",
              },
            ],
          ],
        },
      },
    },
    {
      $unwind: {
        path: "$answers",
      },
    },
    {
      $replaceRoot: {
        newRoot: "$answers",
      },
    },
    {
      $match: {
        _id: new ObjectId(id),
      },
    },
  ]);

  const comment = copyObject(commentFindResult);

  if (!comment?.[0]) {
    throw createHttpError.NotFound("کامنتی با این مشخصات یافت نشد");
  }

  return comment[0];
}

export async function findAcceptedComments(id, status = 2) {
  const acceptedComments = await CommentModel.aggregate([
    {
      $match: {
        post: new ObjectId(id),
        status,
      },
    },
    {
      $project: {
        status: 1,
        _id: 1,
        openToComment: 1,
        content: 1,
        user: 1,
        createdAt: 1,
        answers: {
          $filter: {
            input: "$answers",
            as: "answer",
            cond: {
              $eq: ["$$answer.status", status],
            },
          },
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
        pipeline: [
          {
            $project: {
              name: 1,
              biography: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: "$user",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "answers.user",
        foreignField: "_id",
        as: "answerWriter",
        pipeline: [
          {
            $project: {
              name: 1,
              biography: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
    {
      $project: {
        content: 1,
        user: 1,
        status: 1,
        openToComment: 1,
        createdAt: 1,
        _id: 1,
        answers: {
          $map: {
            input: "$answers",
            as: "item",
            in: {
              content: "$$item.content",
              status: "$$item.status",
              openToComment: "$$item.openToComment",
              createdAt: "$$item.createdAt",
              _id: "$$item._id",
              user: {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: "$answerWriter",
                      as: "writer",
                      cond: {
                        $eq: ["$$writer._id", "$$item.user"],
                      },
                    },
                  },
                  0,
                ],
              },
            },
          },
        },
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);

  const transformedComments = acceptedComments.map((comment) => ({
    ...comment,

    user: comment.user
      ? {
          ...comment.user,
          avatarUrl: comment.user.avatar
            ? getStorageFileUrl(comment.user.avatar)
            : null,
        }
      : null,

    createdAt: calculateDateDuration(comment.createdAt),

    answers: (comment.answers ?? []).map((answer) => ({
      ...answer,

      user: answer.user
        ? {
            ...answer.user,
            avatarUrl: answer.user.avatar
              ? getStorageFileUrl(answer.user.avatar)
              : null,
          }
        : null,

      createdAt: calculateDateDuration(answer.createdAt),
    })),
  }));

  return copyObject(transformedComments);
}
