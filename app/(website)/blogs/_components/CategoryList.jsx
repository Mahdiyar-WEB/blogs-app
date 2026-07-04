import NavLink from "components/NavLink";
import React from "react";
import categoryServices from "api/categoryServices";

const CategoryList = async ({ mobile = false }) => {
  const { data } = await categoryServices.getAllCategories();

  if (mobile) {
    return (
      <>
        <NavLink mobile path="/blogs" text="همه" />

        {data?.categories.map(({ title, slug, _id }) => (
          <NavLink
            key={_id}
            mobile
            prefetch={false}
            path={`/blogs/category/${slug}`}
            text={title}
          />
        ))}
      </>
    );
  }

  return (
    <ul className="text-md md:text-lg space-y-3 ms-3">
      <NavLink listOption path="/blogs" text="همه" />

      {data?.categories.map(({ title, slug, _id }) => (
        <li key={_id}>
          <NavLink
            prefetch={false}
            listOption
            path={`/blogs/category/${slug}`}
            text={title}
          />
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
