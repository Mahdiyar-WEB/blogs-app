import { findAcceptedComments } from "./comments";

export async function transformPost(post, user) {
  post.likesCount = post.likes?.length || 0;

  post.isLiked = false;
  post.isBookmarked = false;

  const acceptedComments = await findAcceptedComments(post._id);

  if (post.author?.avatar) {
    post.author.avatarUrl = `${process.env.NEXT_PUBLIC_STORAGE_BASE_URL}/${post.author.avatar}`;
  }

  if (post.related?.length) {
    post.related = post.related.map((item) => ({
      ...item,
      coverImageUrl: item.coverImage ? `/${item.coverImage}` : null,
      author: {
        ...item.author,
        avatarUrl: item.author?.avatar ? `${process.env.NEXT_PUBLIC_STORAGE_BASE_URL}/${item.author.avatar}` : null,
      },
    }));
  }

  post.comments = acceptedComments;

  post.commentsCount =
    acceptedComments.length +
    acceptedComments.reduce((a, c) => a + c.answers.length, 0);

  if (!user) {
    delete post.likes;
    delete post.bookmarks;
    return post;
  }

  if (post.likes?.some((id) => id.toString() === user._id.toString())) {
    post.isLiked = true;
  }

  if (post.bookmarks?.some((id) => id.toString() === user._id.toString())) {
    post.isBookmarked = true;
  }

  delete post.likes;
  delete post.bookmarks;

  return post;
}
