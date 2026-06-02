import NavLink from "components/NavLink";
import callAPI from "services/callAPI";

import React from "react";

const CategoryList = async () => {
  await new Promise((res) =>
    setTimeout(() => {
      res();
    }, 3000)
  );
  const res = await callAPI.get("category/list");
  const {
    data: { categories = [{ title: "", slug: "" }] },
  } = await res.json();
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
