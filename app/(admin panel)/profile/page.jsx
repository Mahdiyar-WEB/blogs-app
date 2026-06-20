import commentServices from "api/commentServices";
import postServices from "api/postServices";
import userServices from "api/userServices";
import Card from "components/Card";
import Table from "components/Table";
import { cookies } from "next/headers";
import React from "react";
import generateSSRCookies from "utils/generateSSRCookies";
import toPersianDigits from "utils/toPersianDigits";
import PostsInformation from "../_components/PostsInformation";

const fetchAppInformation = async () => {
  const cookieStore = await cookies();

  try {
    const data = await Promise.all([
      userServices.getAllUsers(generateSSRCookies(cookieStore)),
      postServices.getAllPosts(generateSSRCookies(cookieStore)),
      commentServices.getAllComments(),
    ]);
    const usersCount = Number(data[0].data.users.length ?? "0");

    const postsCount = Number(data[1].length ?? "0");

    const commentsCount = Number(data[2].data.comments.length ?? "0");

    return { usersCount, postsCount, commentsCount };
  } catch (error) {
    throw new Error("خطا در بارگذاری اطلاعات");
  }
};

const page = async () => {
  const { usersCount, postsCount, commentsCount } = await fetchAppInformation();

  return (
    <main className="p-5">
      {/* report section */}
      <section className="grid grid-cols-12 gap-8 mb-10">
        <h3 className="col-span-12 font-medium text-xl">اطلاعات سایت</h3>
        <Card
          title="تعداد کاربران"
          content={toPersianDigits(usersCount)}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
              />
            </svg>
          }
        />
        <Card
          title="تعداد پست ها"
          content={toPersianDigits(postsCount)}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
          }
        />
        <Card
          title="تعداد کامنت ها"
          content={toPersianDigits(commentsCount)}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>
          }
        />
      </section>

      {/* posts information section */}
      <PostsInformation fetchQueries="sort=latest&limit=5" title="آخرین پست ها" />
    </main>
  );
};

export default page;
