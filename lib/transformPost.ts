import { findAcceptedComments } from "./comments";
import type { UserDocument } from "types/models";
import type { LeanPost, TransformedPost } from "types/api";

export async function transformPost(
  post: LeanPost,
  user: UserDocument | null,
): Promise<TransformedPost> {
  const transformed = post as unknown as TransformedPost;

  transformed.likesCount = post.likes?.length || 0;
  transformed.isLiked = false;
  transformed.isBookmarked = false;

  const acceptedComments = await findAcceptedComments(post._id);

  if (transformed.author?.avatar) {
    transformed.author.avatarUrl = `/${transformed.author.avatar}`;
  }

  if (transformed.related?.length) {
    transformed.related = transformed.related.map((item) => ({
      ...item,
      coverImageUrl: item.coverImage ? `/${item.coverImage}` : null,
      author: {
        ...item.author,
        avatarUrl: item.author?.avatar ? `/${item.author.avatar}` : null,
      } as LeanPost["author"],
    }));
  }

  transformed.comments = acceptedComments;

  transformed.commentsCount =
    acceptedComments.length +
    acceptedComments.reduce((a, c) => a + c.answers.length, 0);

  if (!user) {
    delete transformed.likes;
    delete transformed.bookmarks;
    return transformed;
  }

  if (transformed.likes?.some((id) => id.toString() === user._id.toString())) {
    transformed.isLiked = true;
  }

  if (transformed.bookmarks?.some((id) => id.toString() === user._id.toString())) {
    transformed.isBookmarked = true;
  }

  delete transformed.likes;
  delete transformed.bookmarks;

  return transformed;
}
