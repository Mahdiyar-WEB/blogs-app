import NavLink from "@/components/NavLink";
import React from "react";

const CategoryList = async () => {
  const res = await fetch(`http://localhost:5000/api/category/list`);
  const {
    data: { categories = [{ title: "", slug: "" }] },
  } = await res.json();
  return (
    <ul className="text-md md:text-lg space-y-3 ms-3">
      <NavLink path="/blogs" text="همه" />
      {categories.map(({ title, slug }, id) => {
        return (
          <li key={id}>
            <NavLink path={`/blogs/category/${slug}`} text={title} />
          </li>
        );
      })}
    </ul>
  );
};

export default CategoryList;
