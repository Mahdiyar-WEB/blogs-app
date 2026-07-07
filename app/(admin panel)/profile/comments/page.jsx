import commentServices from "api/commentServices";
import BreadCrumbs from "components/BreadCrumbs";
import Pagination from "components/Pagination";
import { cookies } from "next/headers";
import React, { Suspense } from "react";
import CommentsInformation from "../../_components/CommentsInformation";
import SearchBox from "components/SearchBox";
import queryString from "query-string";

const CommentsPage = async ({ searchParams }) => {
  const query = queryString.stringify(await searchParams);
  const { data } = await commentServices.getAllComments("", query);

  return (
    <main className="md:p-7">
      <BreadCrumbs />
      <Suspense>
        <SearchBox />
      </Suspense>
      <CommentsInformation fetchQueries={query} />
      <Pagination totalPages={data.totalPages} />
    </main>
  );
};

export default CommentsPage;
