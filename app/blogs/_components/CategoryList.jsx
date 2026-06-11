import NavLink from "components/NavLink";
import React from "react";
import categoryServices from "services/categoryServices";

const CategoryList = async () => {
  const categories = await categoryServices.getAllCategories();
  return (
    <ul className="text-md md:text-lg space-y-3 ms-3">
      <NavLink listOption path="/blogs" text="همه" />
      {categories.map(({ title, slug }, id) => {
        return (
          <li key={id}>
            <NavLink listOption path={`/blogs/category/${slug}`} text={title} />
          </li>
        );
      })}
    </ul>
  );
};

export default CategoryList;
