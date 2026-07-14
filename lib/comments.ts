import mongoose from "mongoose";
import createHttpError from "http-errors";
import { CommentModel } from "./models/Comment";
import { copyObject, calculateDateDuration } from "./utils";
import type { CommentStatus } from "types/models";
import type { FoundCommentOrAnswer, TransformedComment } from "types/api";

const ObjectId = mongoose.Types.ObjectId;

export async function findCommentById(id: string): Promise<FoundCommentOrAnswer | undefined> {
  const commentFindResult = await CommentModel.aggregate<FoundCommentOrAnswer>([
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
    { $unwind: { path: "$answers" } },
    { $replaceRoot: { newRoot: "$answers" } },
    { $match: { _id: new ObjectId(id) } },
  ]);
  const comment = copyObject(commentFindResult);
  if (!comment?.[0])
    throw createHttpError.NotFound("کامنتی با این مشخصات یافت نشد");
  return comment?.[0];
}

export async function findAcceptedComments(
  id: string,
  status: CommentStatus = 2,
): Promise<TransformedComment[]> {
  const acceptedComments = await CommentModel.aggregate<TransformedComment>([
    { $match: { post: new ObjectId(id), status } },
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
            cond: { $eq: ["$$answer.status", status] },
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
        pipeline: [{ $project: { name: 1, biography: 1, avatar: 1 } }],
      },
    },
    {
      $addFields: {
        user: {
          $map: {
            input: "$user",
            as: "item",
            in: {
              $mergeObjects: [
                "$$item",
                { avatarUrl: { $concat: ["/", "$$item.avatar"] } },
              ],
            },
          },
        },
      },
    },
    { $unwind: { path: "$user" } },
    {
      $lookup: {
        from: "users",
        localField: "answers.user",
        foreignField: "_id",
        as: "answerWriter",
        pipeline: [{ $project: { name: 1, biography: 1, avatar: 1 } }],
      },
    },
    {
      $addFields: {
        answerWriter: {
          $map: {
            input: "$answerWriter",
            as: "item",
            in: {
              $mergeObjects: [
                "$$item",
                { avatarUrl: { $concat: ["/", "$$item.avatar"] } },
              ],
            },
          },
        },
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
                      cond: { $eq: ["$$writer._id", "$$item.user"] },
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
    { $sort: { createdAt: -1 } },
  ]);

  const transformed = acceptedComments.map((c) => ({
    ...c,
    createdAt: calculateDateDuration(c.createdAt),
    answers: c.answers.map((a) => ({
      ...a,
      createdAt: calculateDateDuration(a.createdAt),
    })),
  }));

  return copyObject(transformed);
}
