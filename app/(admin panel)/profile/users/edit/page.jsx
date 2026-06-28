import BreadCrumbs from "components/BreadCrumbs";
import React from "react";
import { notFound } from "next/navigation";
import userServices from "api/userServices";
import { cookies } from "next/headers";
import EditUserForm from "./EditUserForm";
import { imageUrlToFile } from "utils/fileFormatter";

const fetchUserById = async (userId) => {
  const cookieStore = await cookies();
  try {
    const data = await userServices.getUserById(cookieStore, userId);
    return data;
  } catch (error) {
    notFound();
  }
};

const EditUserPage = async ({ searchParams }) => {
  const { userId } = await searchParams;
  const { data } = await fetchUserById(userId);

  const avatarFile = data.user.avatarUrl
    ? await imageUrlToFile(data.user.avatarUrl)
    : null;

  return (
    <main className="p-5">
      <BreadCrumbs slugTitle="ویرایش کاربر" />
      <EditUserForm
        key={userId}
        userId={data?.user?._id}
        avatar={avatarFile}
        avatarName={avatarFile?.name || ""}
        avatarUrl={data.user.avatarUrl}
        initialValues={{ name: data?.user?.name, email: data?.user?.email }}
      />
    </main>
  );
};

export default EditUserPage;
