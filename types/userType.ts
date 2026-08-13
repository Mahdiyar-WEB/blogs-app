export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  resetLink?: {
    data?: string;
  };
  biography?: string;
  bookmarkedPosts: string[];
  likedPosts: string[];
  avatar?: string | null;
  avatarBlurDataURL?: string | null;
  avatarUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}