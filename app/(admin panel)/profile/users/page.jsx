import BreadCrumbs from "components/BreadCrumbs";
import Pagination from "components/Pagination";
import { cookies } from "next/headers";
import React, { Suspense } from "react";
import SearchBox from "components/SearchBox";
import queryString from "query-string";
import userServices from "api/userServices";
import generateSSRCookies from "utils/generateSSRCookies";
import UsersInformation from "../../_components/UsersInformation";

const UsersPage = async ({ searchParams }) => {
  const query = queryString.stringify(await searchParams);
  const cookieStore = await cookies();

  const { data } = await userServices.getAllUsers(
    generateSSRCookies(cookieStore),
    query,
  );
  return (
    <main className="p-7">
      <BreadCrumbs />
      <Suspense>
        <SearchBox />
      </Suspense>
      <UsersInformation fetchQueries={query} />
      <Pagination totalPages={data.totalPages} />
    </main>
  );
};

export default UsersPage;
