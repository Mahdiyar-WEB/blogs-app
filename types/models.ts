import type { Document, Model, Types } from "mongoose";

export interface ICategory {
  title: string;
  englishTitle: string;
  description: string;
  slug: string;
  icon?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CategoryDocument = ICategory & Document;

export type CommentStatus = 0 | 1 | 2;

export interface ICommentContent {
  text: string;
}

export interface IAnswer {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  post: Types.ObjectId;
  content: ICommentContent;
  status: CommentStatus;
  openToComment: boolean;
  createdAt: Date;
}

export interface IComment {
  user: Types.ObjectId;
  post?: Types.ObjectId;
  content: ICommentContent;
  status: CommentStatus;
  openToComment: boolean;
  answers: Types.DocumentArray<IAnswer & Document>;
  createdAt: Date;
}

export type CommentDocument = IComment & Document;

export type PostType = "free" | "premium";

export interface IPost {
  title: string;
  slug: string;
  category: Types.ObjectId;
  type: PostType;
  briefText: string;
  text: string;
  coverImage: string;
  likes: Types.ObjectId[];
  bookmarks: Types.ObjectId[];
  readingTime: number;
  tags: string[];
  author?: Types.ObjectId;
  related: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  coverImageUrl?: string | null;
}

export type PostDocument = IPost & Document;

export interface IUser {
  name: string;
  email: string;
  password: string;
  resetLink?: { data?: string };
  biography?: string;
  bookmarkedPosts: Types.ObjectId[];
  likedPosts: Types.ObjectId[];
  avatar?: string | null;
  createdAt: Date;
  updatedAt: Date;
  avatarUrl?: string | null;
}

export type UserDocument = IUser & Document;

export type CategoryModelType = Model<CategoryDocument>;
export type CommentModelType = Model<CommentDocument>;
export type PostModelType = Model<PostDocument>;
export type UserModelType = Model<UserDocument>;
