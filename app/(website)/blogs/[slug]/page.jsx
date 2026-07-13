import { Suspense } from "react";
import SinglePostContent from "./SinglePostContent";
import SinglePostSkeleton from "./SinglePostSkeleton";

export default function Page({ params }) {
  return (
    <Suspense fallback={<SinglePostSkeleton />}>
      <SinglePostContent params={params} />
    </Suspense>
  );
}
