import { Suspense } from "react";
import SinglePostContent from "./SinglePostContent";
import SinglePostSkeleton from "./SinglePostSkeleton";

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<SinglePostSkeleton />}>
      <SinglePostContent params={params} />
    </Suspense>
  );
}
