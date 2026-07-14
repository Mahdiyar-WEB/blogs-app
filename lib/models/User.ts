import mongoose from "mongoose";
import type { UserDocument, UserModelType } from "types/models";

const ObjectId = mongoose.Schema.Types.ObjectId;

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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

UserSchema.virtual("avatarUrl").get(function (this: UserDocument) {
  if (this.avatar) return `/${this.avatar}`;
  return null;
});

UserSchema.methods.toJSON = function (this: UserDocument) {
  const obj = this.toObject() as Record<string, unknown>;
  obj.avatarUrl = this.avatarUrl;
  delete obj.password;
  return obj;
};

export const UserModel: UserModelType =
  (mongoose.models.User as UserModelType) ||
  mongoose.model<UserDocument>("User", UserSchema);
