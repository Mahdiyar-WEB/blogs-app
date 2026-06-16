import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import postServices from "api/postServices";
import RelatedPosts from "../_components/RelatedPosts";
import PostComments from "../_components/PostComments";

async function getCachedPost(slug) {
  "use cache";
  cacheLife("hours");
  return await postServices.getPostBySlug(slug);
}

export async function generateStaticParams() {
  const posts = await postServices.getAllPosts();
  return posts.slice(0, 3).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = (await getCachedPost(slug)) || { title: "", briefText: "" };
  return { title: post.title, description: post.briefText };
}

const SinglePost = async ({ params }) => {
  const { slug } = await params;
  const post = await getCachedPost(slug);
  if (!post) notFound();
  return (
    <main className="w-11/12 mx-auto 2xl:max-w-screen-2xl">
      {post.title}
      {post.related.length > 0 && <RelatedPosts posts={post.related} />}
      <PostComments {...post} />
    </main>
  );
};

export default SinglePost;
