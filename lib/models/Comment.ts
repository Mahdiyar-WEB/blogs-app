import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

export interface CommentContent {
  text: string;
}

export interface CommentAnswer {
  user: mongoose.Types.ObjectId;
  post: mongoose.Types.ObjectId;
  content: CommentContent;
  status: number;
  openToComment: boolean;
  createdAt?: Date;
}

export interface Comment {
  user: mongoose.Types.ObjectId;
  post?: mongoose.Types.ObjectId;
  content: CommentContent;
  status: number;
  openToComment: boolean;
  answers: CommentAnswer[];
  createdAt?: Date;
}

const AnswerSchema = new mongoose.Schema<CommentAnswer>(
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

const CommentSchema = new mongoose.Schema<Comment>(
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

export const CommentModel =
  (mongoose.models.Comment as mongoose.Model<Comment> | undefined) ||
  mongoose.model<Comment>("Comment", CommentSchema);
