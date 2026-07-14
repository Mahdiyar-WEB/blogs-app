import mongoose from "mongoose";
import type { CommentDocument, CommentModelType, IAnswer } from "types/models";

const ObjectId = mongoose.Schema.Types.ObjectId;

const AnswerSchema = new mongoose.Schema<IAnswer>(
  {
    user: { type: ObjectId, ref: "User", required: true },
    post: { type: ObjectId, ref: "Post", required: true },
    content: {
      text: { type: String, required: true },
    },
    status: { type: Number, required: true, default: 1, enum: [0, 1, 2] },
    openToComment: { type: Boolean, default: false },
  },
  {
    timestamps: { createdAt: true },
  },
);

const CommentSchema = new mongoose.Schema<CommentDocument>(
  {
    user: { type: ObjectId, ref: "User", required: true },
    post: { type: ObjectId, ref: "Post" },
    content: {
      text: { type: String, required: true },
    },
    status: { type: Number, required: true, default: 1, enum: [0, 1, 2] },
    openToComment: { type: Boolean, default: true },
    answers: { type: [AnswerSchema], default: [] },
  },
  {
    timestamps: { createdAt: true },
  },
);

export const CommentModel: CommentModelType =
  (mongoose.models.Comment as CommentModelType) ||
  mongoose.model<CommentDocument>("Comment", CommentSchema);
