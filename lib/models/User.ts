import { getStorageFileUrl } from "lib/upload";
import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

interface UserDocument {
  name: string;
  email: string;
  password: string;
  resetLink?: {
    data?: string;
  };
  biography?: string;
  bookmarkedPosts: mongoose.Types.ObjectId[];
  likedPosts: mongoose.Types.ObjectId[];
  avatar?: string | null;
  avatarBlurDataURL?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface UserObject extends Omit<UserDocument, "password"> {
  _id: mongoose.Types.ObjectId;
  password?: string;
  avatarUrl?: string | null;
}

const UserSchema = new mongoose.Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetLink: { data: String },
    biography: { type: String },
    bookmarkedPosts: [{ type: ObjectId, ref: "Post" }],
    likedPosts: [{ type: ObjectId, ref: "Post" }],
    avatar: { type: String, default: null },
    avatarBlurDataURL: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

UserSchema.virtual("avatarUrl").get(function () {
  if (this.avatar) {
    return getStorageFileUrl(this.avatar);
  }

  return null;
});

UserSchema.methods.toJSON = function (
  this: mongoose.HydratedDocument<UserDocument> & {
    avatarUrl?: string | null;
  },
) {
  const obj = this.toObject() as UserObject;

  obj.avatarUrl = this.avatarUrl;

  delete obj.password;

  return obj;
};

export const UserModel =
  (mongoose.models.User as mongoose.Model<UserDocument> | undefined) ||
  mongoose.model<UserDocument>("User", UserSchema);