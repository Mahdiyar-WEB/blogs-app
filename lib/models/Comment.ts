import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

interface AnswerDocument {
  user: mongoose.Types.ObjectId;
  post: mongoose.Types.ObjectId;
  content: {
    text: string;
  };
  status: number;
  openToComment: boolean;
  createdAt: Date;
}

interface CommentDocument {
  user: mongoose.Types.ObjectId;
  post?: mongoose.Types.ObjectId;
  content: {
    text: string;
  };
  status: number;
  openToComment: boolean;
  answers: AnswerDocument[];
  createdAt: Date;
  updatedAt: Date;
}

const AnswerSchema = new mongoose.Schema<AnswerDocument>(
  {
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },

    post: {
      type: ObjectId,
      ref: "Post",
      required: true,
    },

    content: {
      text: {
        type: String,
        required: true,
      },
    },

    status: {
      type: Number,
      required: true,
      default: 1,
      enum: [0, 1, 2],
    },

    openToComment: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: true,
    },
  },
);

const CommentSchema = new mongoose.Schema<CommentDocument>(
  {
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },

    post: {
      type: ObjectId,
      ref: "Post",
    },

    content: {
      text: {
        type: String,
        required: true,
      },
    },

    status: {
      type: Number,
      required: true,
      default: 1,
      enum: [0, 1, 2],
    },

    openToComment: {
      type: Boolean,
      default: true,
    },

    answers: {
      type: [AnswerSchema],
      default: [],
    },
  },
  {
    timestamps: {
      createdAt: true,
    },
  },
);

export const CommentModel =
  (mongoose.models.Comment as mongoose.Model<CommentDocument> | undefined) ||
  mongoose.model<CommentDocument>("Comment", CommentSchema);