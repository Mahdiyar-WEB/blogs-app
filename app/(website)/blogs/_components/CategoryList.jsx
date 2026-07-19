import React from "react";
import categoryServices from "api/categoryServices";
import AnimatedFadeIn from "components/ui/AnimatedFadeIn";
import CategoryItem from "./CategoryItem";

const CategoryList = async ({ mobile = false }) => {
  const { data } = await categoryServices.getAllCategories();
  const categories = data?.categories || [];

  if (mobile) {
    return (
      <>
        <AnimatedFadeIn index={0}>
          <CategoryItem mobile path="/blogs" text="همه" />
        </AnimatedFadeIn>

        {categories.map(({ title, slug, _id }, index) => (
          <AnimatedFadeIn key={_id} index={index + 1}>
            <CategoryItem
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
    <ul className="space-y-3">
      <AnimatedFadeIn as="li" index={0}>
        <CategoryItem path="/blogs" text="همه" />
      </AnimatedFadeIn>

      {categories.map(({ title, slug, _id }, index) => (
        <AnimatedFadeIn key={_id} as="li" index={index + 1}>
          <CategoryItem
            prefetch={false}
            path={`/blogs/category/${slug}`}
            text={title}
          />
        </AnimatedFadeIn>
      ))}
    </ul>
  );
};

export default CategoryList;
