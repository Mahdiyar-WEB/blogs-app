import type { CommentStatus, ICommentContent, PostType } from "./models";

export interface LeanAuthorSummary {
  _id: string;
  name?: string;
  biography?: string;
  avatar?: string | null;
  avatarUrl?: string | null;
}

export interface LeanCategorySummary {
  _id: string;
  title: string;
  slug: string;
}

export interface LeanRelatedPost {
  _id: string;
  title: string;
  slug: string;
  briefText: string;
  coverImage: string;
  coverImageUrl?: string | null;
  author?: LeanAuthorSummary;
  category?: LeanCategorySummary;
}

export interface LeanPost {
  _id: string;
  title: string;
  slug: string;
  category?: LeanCategorySummary;
  type: PostType;
  briefText: string;
  text: string;
  coverImage: string;
  coverImageUrl?: string | null;
  likes?: string[];
  bookmarks?: string[];
  readingTime: number;
  tags: string[];
  author?: LeanAuthorSummary;
  related?: LeanRelatedPost[];
  createdAt: string;
  updatedAt: string;
}

export interface TransformedCommentAnswer {
  _id: string;
  content: ICommentContent;
  status: CommentStatus;
  openToComment: boolean;
  createdAt: string;
  user?: LeanAuthorSummary;
}

export interface TransformedComment {
  _id: string;
  content: ICommentContent;
  status: CommentStatus;
  openToComment: boolean;
  createdAt: string;
  user: LeanAuthorSummary;
  answers: TransformedCommentAnswer[];
}

export interface FoundCommentOrAnswer {
  _id: string;
  content: ICommentContent;
  status: CommentStatus;
  openToComment: boolean;
}

export interface TransformedPost extends Omit<LeanPost, "likes" | "bookmarks"> {
  likes?: string[];
  bookmarks?: string[];
  likesCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
  comments: TransformedComment[];
  commentsCount: number;
}

export interface SavedUploadedFile {
  filename: string;
  fileUploadPath: string;
  fileAddress: string;
}
