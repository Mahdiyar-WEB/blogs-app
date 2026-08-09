import { getStorageFileUrl } from "lib/upload";
import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

export interface Post {
  title: string;
  slug: string;
  category: mongoose.Types.ObjectId;
  type: "free" | "premium";
  briefText: string;
  text: string;
  coverImage: string;
  coverImageBlurDataURL: string;
  likes: mongoose.Types.ObjectId[];
  bookmarks: mongoose.Types.ObjectId[];
  readingTime: number;
  tags: string[];
  author?: mongoose.Types.ObjectId;
  related: mongoose.Types.ObjectId[];
  coverImageUrl?: string | null;
}

const PostSchema = new mongoose.Schema<Post>(
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
    coverImage: { type: String, required: true },
    coverImageBlurDataURL: {
      type: String,
      required: true,
    },
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

PostSchema.virtual("coverImageUrl").get(function () {
  if (!this.coverImage) return null;
  return getStorageFileUrl(this.coverImage);
});

export const PostModel =
  (mongoose.models.Post as mongoose.Model<Post> | undefined) ||
  mongoose.model<Post>("Post", PostSchema);
