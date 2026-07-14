"use client";
import ButtonIcon from "components/ButtonIcon";
import Table from "components/Table";
import React, { useState } from "react";
import toLocalDateShort from "utils/toLocalDate";
import toPersianDigits from "utils/toPersianDigits";
import truncateText from "utils/truncateText";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "components/Button";
import DeleteCommentModal from "./DeleteCommentModal";
import useGetComments from "hooks/comments/useGetComments";

const CommentsInformation = ({ fetchQueries }) => {
  const { comments, isLoading } = useGetComments(fetchQueries);
  const router = useRouter();

  const [openedComments, setOpenedComments] = useState([]);

  const toggleAnswers = (commentId) => {
    setOpenedComments((prev) =>
      prev.includes(commentId)
        ? prev.filter((id) => id !== commentId)
        : [...prev, commentId],
    );
  };
  const [selectedComment, setSelectedComment] = useState(null);

  const onCloseCommentAction = () => {
    setSelectedComment(null);
  };

  return (
    <section className="mb-5">
      <Table>
        <Table.Header>
          <th>#</th>
          <th>متن</th>
          <th>
            <p className="flex gap-1 items-center">
              <span>پست</span>
              <span className="text-xs">(برای مشاهده کلیک کنید)</span>
            </p>
          </th>
          <th>نویسنده</th>
          <th>تاریخ ایجاد</th>
          <th>تاریخ ویرایش کامنت</th>
          <th>قابلیت پاسخ</th>
          <th>عملیات</th>
        </Table.Header>
        <Table.Body>
          {comments.map((comment, index) => (
            <React.Fragment key={comment._id}>
              <Table.Row>
                <td>{toPersianDigits(index + 1)}</td>
                <td>{truncateText(comment.content.text, 25)}</td>
                <td>
                  <Button
                    variant="secondary"
                    onClick={() => router.push(`/blogs/${comment?.post?.slug}`)}
                    className="py-2"
                  >
                    {comment.post?.title}
                  </Button>
                </td>
                <td>{comment.user?.name}</td>
                <td>{toLocalDateShort(comment.createdAt)}</td>
                <td>{toLocalDateShort(comment.updatedAt)}</td>
                <td>
                  <span
                    className={`badge ${
                      comment.openToComment
                        ? "badge--success"
                        : "badge--secondary"
                    }`}
                  >
                    {comment.openToComment ? "دارد" : "ندارد"}
                  </span>
                </td>
                <td>
                  <div className="flex gap-2">
                    {comment.answers.length > 0 && (
                      <ButtonIcon
                        variant={
                          openedComments.includes(comment._id)
                            ? "secondary"
                            : "primary"
                        }
                        onClick={() => toggleAnswers(comment._id)}
                      >
                        {openedComments.includes(comment._id) ? (
                          <>
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="size-5"
                              >
                                <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                                <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                                <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                              </svg>
                            </span>
                            <span className="m-1">بستن جواب ها</span>
                          </>
                        ) : (
                          <>
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="size-5"
                              >
                                <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                <path
                                  fillRule="evenodd"
                                  d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                            <span className="m-1">مشاهده جواب ها</span>
                          </>
                        )}
                      </ButtonIcon>
                    )}

                    <ButtonIcon
                      onClick={() => setSelectedComment(comment)}
                      variant="red"
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
                      <span className="m-1">حذف کامنت</span>
                    </ButtonIcon>
                  </div>
                </td>
              </Table.Row>

              {openedComments.includes(comment._id) &&
                comment.answers.map((answer) => (
                  <Table.Row key={answer._id} className="bg-secondary-50">
                    <td>↲</td>

                    <td className="pr-10">
                      {truncateText(answer.content.text, 25)}
                    </td>

                    <td>{comment.post?.title}</td>

                    <td>{answer.user?.name}</td>

                    <td>{toLocalDateShort(answer.createdAt)}</td>

                    <td>-</td>

                    <td>
                      <span
                        className={`badge ${
                          answer.openToComment
                            ? "badge--success"
                            : "badge--secondary"
                        }`}
                      >
                        {answer.openToComment ? "دارد" : "ندارد"}
                      </span>
                    </td>

                    <td>
                      <ButtonIcon
                        onClick={() => setSelectedComment(answer)}
                        variant="red"
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
                        <span className="m-1">حذف کامنت</span>
                      </ButtonIcon>
                    </td>
                  </Table.Row>
                ))}
            </React.Fragment>
          ))}
          {isLoading &&
            Array.from({ length: 5 }).map((_, index) => (
              <Table.Row key={index}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <td key={i} className="px-5 py-4 whitespace-nowrap">
                    <div className="h-8 w-24 rounded-md bg-secondary-200 animate-pulse" />
                  </td>
                ))}
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
      {comments.length === 0 && !isLoading && (
        <div className="flex justify-center flex-col items-center bg-white py-3">
          <Image
            priority
            className="object-cover object-center"
            width={500}
            height={500}
            quality={100}
            alt=""
            src="/no-blogs.png"
          />
          <p className="text-xl font-semibold">پستی پیدا نشد!</p>
        </div>
      )}
      <DeleteCommentModal
        comment={selectedComment}
        onClose={onCloseCommentAction}
      />
    </section>
  );
};

export default CommentsInformation;
