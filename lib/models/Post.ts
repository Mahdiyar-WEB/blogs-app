import mongoose from "mongoose";
import type { PostDocument, PostModelType } from "types/models";

const ObjectId = mongoose.Schema.Types.ObjectId;

const PostSchema = new mongoose.Schema<PostDocument>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    type: {
      type: String,
      default: "free",
      required: true,
      enum: ["free", "premium"],
    },
    briefText: { type: String, required: true },
    text: { type: String, required: true },
    coverImage: { type: String, required: true, unique: true },
    likes: [{ type: ObjectId, ref: "User" }],
    bookmarks: [{ type: ObjectId, ref: "User" }],
    readingTime: { type: Number, required: true },
    tags: [{ type: String }],
    author: { type: ObjectId, ref: "User" },
    related: [{ type: ObjectId, ref: "Post" }],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

PostSchema.virtual("coverImageUrl").get(function (this: PostDocument) {
  if (this.coverImage) return `/${this.coverImage}`;
  return null;
});

export const PostModel: PostModelType =
  (mongoose.models.Post as PostModelType) ||
  mongoose.model<PostDocument>("Post", PostSchema);
