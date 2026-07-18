"use client";

import ButtonIcon from "components/ButtonIcon";
import Table from "components/Table";
import React, { useState } from "react";
import toLocalDateShort from "utils/toLocalDate";
import toPersianDigits from "utils/toPersianDigits";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useGetUsers from "hooks/users/useGetUsers";
import DeleteUserModal from "./DeleteUserModal";
import { AnimatedTableRow } from "components/ui/TableMotion";
import useDelayedLoading from "hooks/useDelayedLoading";

const UsersInformation = ({ fetchQueries }) => {
  const { users, isLoading } = useGetUsers(fetchQueries);
  const router = useRouter();
  const showLoading = useDelayedLoading(isLoading, {
    delay: 250,
    minDuration: 300,
  });

  const [selectedUser, setSelectedUser] = useState(null);

  const onCloseUserAction = () => {
    setSelectedUser(null);
  };

  return (
    <section className="mb-5">
      <Table>
        <Table.Header>
          <th>#</th>
          <th>نام</th>
          <th>ایمیل</th>
          <th>تاریخ ایجاد</th>
          <th>آخرین تغییر</th>
          <th>عملیات</th>
        </Table.Header>

        <Table.Body>
          {users.map((user, index) => (
            <AnimatedTableRow
              key={user._id}
              index={index}
              className="transition-colors duration-200 hover:bg-primary-50/40"
            >
              <td>{toPersianDigits(index + 1)}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{toLocalDateShort(user.createdAt)}</td>
              <td>{toLocalDateShort(user.updatedAt)}</td>
              <td>
                <div className="flex gap-3">
                  <ButtonIcon
                    variant="primary"
                    onClick={() =>
                      router.push(`/profile/users/edit?userId=${user._id}`)
                    }
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-5"
                      >
                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                      </svg>
                    </span>
                    <span className="m-1">ویرایش کاربر</span>
                  </ButtonIcon>

                  <ButtonIcon
                    variant="red"
                    onClick={() => setSelectedUser(user)}
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="m-1">حذف کاربر</span>
                  </ButtonIcon>
                </div>
              </td>
            </AnimatedTableRow>
          ))}

          {showLoading &&
            Array.from({ length: 5 }).map((_, index) => (
              <Table.SkeletonRow key={index} columns={6} />
            ))}
        </Table.Body>
      </Table>

      {users.length === 0 && !isLoading && (
        <div className="flex justify-center flex-col items-center bg-white py-3">
          <Image
            priority
            className="object-cover object-center"
            width={500}
            height={500}
            quality={100}
            alt="no-blogs"
            src="/no-blogs.webp"
          />
          <p className="text-xl font-semibold">کاربری پیدا نشد!</p>
        </div>
      )}

      <DeleteUserModal user={selectedUser} onClose={onCloseUserAction} />
    </section>
  );
};

export default UsersInformation;
