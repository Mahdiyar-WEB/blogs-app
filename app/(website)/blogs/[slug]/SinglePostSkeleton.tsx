const SkeletonBox = ({ className = "" }) => {
  return (
    <div
      className={`animate-pulse bg-secondary-200/70 rounded-lg ${className}`}
    />
  );
};

export default function SinglePostSkeleton() {
  return (
    <main className="w-11/12 mx-auto 2xl:max-w-screen-2xl">
      {/* Breadcrumb Skeleton */}
      <div className="mb-5">
        <SkeletonBox className="h-10 w-48 rounded-xl" />
      </div>

      {/* Hero Skeleton */}
      <div className="relative mt-4 pb-4 sm:pb-6">
        <section
          className="
            relative 
            rounded-2xl 
            lg:rounded-[2rem]
            overflow-hidden
            border border-secondary-100
            bg-white
          "
        >
          {/* Image */}
          <SkeletonBox
            className="
              w-full
              aspect-[4/5]
              sm:aspect-[16/10]
              lg:aspect-[21/9]
              rounded-none
            "
          />

          {/* top badges */}
          <div className="absolute top-4 inset-x-4 lg:top-6 lg:inset-x-6 flex justify-between">
            <SkeletonBox className="h-7 w-24 rounded-full" />

            <SkeletonBox className="h-7 w-32 rounded-full" />
          </div>

          {/* Bottom content */}
          <div
            className="
              absolute
              bottom-0
              inset-x-0
              p-4
              sm:p-6
              lg:p-10
              space-y-3
            "
          >
            {/* title */}
            <SkeletonBox
              className="
                h-8
                sm:h-10
                lg:h-12
                max-w-3xl
                w-4/5
                bg-white/20
              "
            />

            {/* description */}
            <SkeletonBox
              className="
                h-5
                w-3/5
                bg-white/20
              "
            />

            {/* author row */}
            <div className="flex items-center gap-3 pt-3">
              <SkeletonBox
                className="
                  w-9
                  h-9
                  rounded-full
                  bg-white/20
                "
              />

              <SkeletonBox
                className="
                  h-4
                  w-24
                  bg-white/20
                "
              />

              <SkeletonBox
                className="
                  h-3
                  w-3
                  rounded-full
                  bg-white/20
                "
              />

              <SkeletonBox
                className="
                  h-4
                  w-20
                  bg-white/20
                "
              />
            </div>
          </div>
        </section>
      </div>

      {/* Article Skeleton */}
      <section
        className="
          bg-white
          shadow-md
          border
          border-secondary-100
          rounded-2xl
          overflow-hidden
          mb-12
        "
      >
        <article className="p-5 sm:p-8 lg:p-12 space-y-5">
          <SkeletonBox className="h-8 w-2/3" />

          <SkeletonBox className="h-5 w-full" />

          <SkeletonBox className="h-5 w-full" />

          <SkeletonBox className="h-5 w-11/12" />

          <div className="pt-5 space-y-4">
            <SkeletonBox className="h-6 w-1/3" />

            <SkeletonBox className="h-5 w-full" />

            <SkeletonBox className="h-5 w-full" />

            <SkeletonBox className="h-5 w-4/5" />
          </div>
        </article>

        {/* Share footer */}
        <div
          className="
            flex
            items-center
            justify-between
            px-5
            sm:px-8
            lg:px-12
            py-4
            bg-secondary-50/70
            border-t
            border-secondary-100
          "
        >
          <SkeletonBox className="h-4 w-48" />

          <SkeletonBox className="h-12 w-32 rounded-full" />
        </div>
      </section>

      {/* Comments Skeleton */}
      <section
        className="
          bg-white
          shadow-md
          border
          border-secondary-100
          rounded-2xl
          p-4
          sm:p-8
        "
      >
        <div className="flex justify-between items-center mb-8">
          <SkeletonBox className="h-7 w-32" />

          <SkeletonBox className="h-10 w-36 rounded-lg" />
        </div>

        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="
              border
              border-secondary-100
              rounded-xl
              p-4
              mb-4
              space-y-3
            "
          >
            <div className="flex gap-3 items-center">
              <SkeletonBox className="h-10 w-10 rounded-full" />

              <SkeletonBox className="h-4 w-28" />
            </div>

            <SkeletonBox className="h-4 w-full" />

            <SkeletonBox className="h-4 w-4/5" />
          </div>
        ))}
      </section>
    </main>
  );
}
