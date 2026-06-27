import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import postServices from "api/postServices";
import RelatedPosts from "../_components/RelatedPosts";
import PostComments from "../_components/PostComments";
import Image from "next/image";
import BreadCrumbs from "components/BreadCrumbs";

async function getCachedPost(slug) {
  "use cache";
  cacheLife("minutes");
  return await postServices.getPostBySlug(slug);
}

export async function generateStaticParams() {
  const { posts } = await postServices.getAllPosts();
  return posts.slice(0, 3).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = (await getCachedPost(slug)) || { title: "", briefText: "" };
  return { title: post.title, description: post.briefText };
}

const SinglePost = async ({ params }) => {
  const { slug } = await params;
  let post;
  try {
    post = await getCachedPost(slug);
  } catch (error) {
    notFound();
  }
  return (
    <main className="w-11/12 mx-auto 2xl:max-w-screen-2xl">
      <BreadCrumbs slugTitle={post.title} />
      <section className="space-y-5">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <h2 className="text-xl">{post.briefText}</h2>
        <p>{post.text}</p>
        <div className="relative aspect-w-16 aspect-h-9 lg:aspect-h-5 overflow-hidden rounded-lg mb-10">
          <Image
            className="object-cover object-center hover:scale-110 transition-all ease-out duration-300"
            fill
            quality={100}
            alt={post.title}
            src={post.coverImageUrl}
          />
        </div>
      </section>
      {post.related.length > 0 && <RelatedPosts posts={post.related} />}
      <PostComments post={post} />
    </main>
  );
};

export default SinglePost;
