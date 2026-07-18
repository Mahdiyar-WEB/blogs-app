"use client";

import ButtonIcon from "components/ButtonIcon";
import Table from "components/Table";
import React, { useState } from "react";
import toLocalDateShort from "utils/toLocalDate";
import toPersianDigits from "utils/toPersianDigits";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useGetCategories from "hooks/categories/useGetCategories";
import DeleteCategoryModal from "./DeleteCategoryModal";
import { AnimatedTableRow } from "components/ui/TableMotion";
import useDelayedLoading from "hooks/useDelayedLoading";

const CategoriesInformation = ({ fetchQueries }) => {
  const { categories = [], isLoading } = useGetCategories(fetchQueries);
  const router = useRouter();
  const showLoading = useDelayedLoading(isLoading, {
    delay: 250,
    minDuration: 300,
  });

  const [selectedCategory, setSelectedCategory] = useState(null);

  const onCloseCategoryAction = () => {
    setSelectedCategory(null);
  };

  return (
    <section className="mb-5">
      <Table>
        <Table.Header>
          <th>#</th>
          <th>عنوان</th>
          <th>عنوان انگلیسی</th>
          <th>توضیحات</th>
          <th>تاریخ ایجاد</th>
          <th>آخرین تغییر</th>
          <th>عملیات</th>
        </Table.Header>

        <Table.Body>
          {categories.map((category, index) => (
            <AnimatedTableRow
              key={category._id}
              index={index}
              className="transition-colors duration-200 hover:bg-primary-50/40"
            >
              <td>{toPersianDigits(index + 1)}</td>
              <td>{category.title}</td>
              <td>{category.englishTitle}</td>
              <td>{category.description}</td>
              <td>{toLocalDateShort(category.createdAt)}</td>
              <td>{toLocalDateShort(category.updatedAt)}</td>
              <td>
                <div className="flex gap-3">
                  <ButtonIcon
                    variant="primary"
                    onClick={() =>
                      router.push(
                        `/profile/categories/edit?categoryTitle=${category.englishTitle}`,
                      )
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
                    <span className="m-1">ویرایش دسته بندی</span>
                  </ButtonIcon>

                  <ButtonIcon
                    variant="red"
                    onClick={() => setSelectedCategory(category)}
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
                    <span className="m-1">حذف دسته بندی</span>
                  </ButtonIcon>
                </div>
              </td>
            </AnimatedTableRow>
          ))}

          {showLoading &&
            Array.from({ length: 5 }).map((_, index) => (
              <Table.SkeletonRow key={index} columns={7} />
            ))}
        </Table.Body>
      </Table>

      {categories.length === 0 && !isLoading && (
        <div className="flex justify-center flex-col items-center bg-white py-3">
          <Image
            priority
            className="object-cover object-center"
            width={500}
            height={500}
            quality={100}
            alt="no-blogs"
            src="/no-blogs.webp"
            placeholder="blur"
            blurDataURL="data:image/webp;base64,UklGRgoBAABXRUJQVlA4WAoAAAAQAAAADQAACQAAQUxQSGoAAAABcFpt27LcuEZ3iLoAdLpHZtBMZwBtHBbgkMjeIJKI7pDdvh0iYgL4NXvtBin/g8XufDZpRmU/rt7r7zUrBTIv4coHNET3NKhbe8EtDebKWHCJQKjUFnQiEIyVN4vFYrGchm0g15v8fz0AVlA4IHoAAABQAgCdASoOAAoAAgA0JbACdAYul2w2vCjc4AAA/Nj6mtzioQ79IW299pVH2o8B6fNMxo2CD+Tc2jKz6rxV8jGp0LsqJSITd3ty2jJ0PirkcKnX7TQYQKR5OEwPyKcK+O+XHpK8i/dZvSi/L7QGqBf+DKf6mg8dg/jgAA=="
          />
          <p className="text-xl font-semibold">دسته‌بندی‌ای پیدا نشد!</p>
        </div>
      )}

      <DeleteCategoryModal
        category={selectedCategory}
        onClose={onCloseCategoryAction}
      />
    </section>
  );
};

export default CategoriesInformation;
