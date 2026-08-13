export type PostAuthor = {
  _id: string;
  name: string;
  biography?: string;
  avatar?: string | null;
  avatarUrl?: string | undefined;
  avatarBlurDataURL?: string | undefined;
};

export type PostComment = {
  _id: string;
  text: string;
  answers: PostComment[];
  user: {
    name: string;
    avatarUrl: string;
  };
  createdAt: string;
  openToComment: boolean;
  content: {
    text: string;
  };
};

export interface Post {
  _id: string;
  likesCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
  commentsCount: number;
  comments: PostComment[];
  title: string;
  slug: string;
  category: {
    _id: string;
    title: string;
    slug: string;
  };
  type: "free" | "premium";
  briefText: string;
  text: string;
  coverImage: string;
  coverImageBlurDataURL: string;
  likes: string[];
  bookmarks: string[];
  readingTime: number;
  tags: string[];
  author: PostAuthor;
  related: Post[];
  coverImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}