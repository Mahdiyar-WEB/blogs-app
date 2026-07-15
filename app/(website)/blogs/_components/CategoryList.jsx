import NavLink from "components/NavLink";
import React from "react";
import categoryServices from "api/categoryServices";
import AnimatedFadeIn from "components/ui/AnimatedFadeIn";

const CategoryList = async ({ mobile = false }) => {
  const { data } = await categoryServices.getAllCategories();
  const categories = data?.categories || [];

  if (mobile) {
    return (
      <>
        <AnimatedFadeIn index={0}>
          <NavLink mobile path="/blogs" text="همه" />
        </AnimatedFadeIn>

        {categories.map(({ title, slug, _id }, index) => (
          <AnimatedFadeIn key={_id} index={index + 1}>
            <NavLink
              mobile
              prefetch={false}
              path={`/blogs/category/${slug}`}
              text={title}
            />
          </AnimatedFadeIn>
        ))}
      </>
    );
  }

  return (
    <ul className="text-md md:text-lg space-y-3 ms-3">
      <AnimatedFadeIn as="li" index={0}>
        <NavLink listOption path="/blogs" text="همه" />
      </AnimatedFadeIn>

      {categories.map(({ title, slug, _id }, index) => (
        <AnimatedFadeIn key={_id} as="li" index={index + 1}>
          <NavLink
            prefetch={false}
            listOption
            path={`/blogs/category/${slug}`}
            text={title}
          />
        </AnimatedFadeIn>
      ))}
    </ul>
  );
};

export default CategoryList;
