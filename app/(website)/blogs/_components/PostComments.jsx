"use client";
import { Suspense, useEffect, useState } from "react";
import Comment from "./Comment";
import { useRouter } from "next/navigation";
import Button from "components/Button";
import Modal from "components/Modal";
import CommentForm from "./CommentForm";
import authentication from "api/authentication";

function PostComments({ post: { comments = [], _id: postId = "" } }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await authentication.getUser();
      setUser(data?.user);
    };
    fetchUser();
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const [parent, setParent] = useState(null);
  const router = useRouter();

  const onCloseHandler = () => {
    setIsOpen(false);
  };

  const addNewCommentHandler = (parent) => {
    if (!user) {
      router.push(
        {
          pathname: "/signin",
          query: {
            redirect: router.asPath,
          },
        },
        `/signin?redirect=${router.asPath}`,
      );
      return;
    }
    setParent(parent);
    setIsOpen(true);
  };

  return (
    <div className="my-10">
      <Modal
        title={parent ? "پاسخ خودرا برای نظر  " : "نظر جدید"}
        description={parent ? parent.user?.name : "نظر خودرا وارد کنید"}
        open={isOpen}
        onClose={onCloseHandler}
      >
        <CommentForm
          parentId={parent ? parent?._id : null}
          postId={postId}
          onClose={onCloseHandler}
        />
      </Modal>
      <div className="flex flex-col items-center lg:flex-row justify-between gap-y-3 mb-8">
        <h2 className="text-2xl font-bold text-secondary-800">نظرات:</h2>
        <Button
          onClick={() => addNewCommentHandler(null)}
          variant="primary"
          className="flex items-center gap-1 py-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>

          <span>ثبت نظر جدید</span>
        </Button>
      </div>
      <div className="space-y-8 post-comments bg-secondary-0 rounded-xl py-6 px-3 lg:px-6 ">
        {comments.length > 0 ? (
          comments.map((comment) => {
            return (
              <div key={comment._id}>
                <div className="border border-secondary-200 rounded-xl p-2 sm:p-4 mb-3">
                  <Comment
                    comment={comment}
                    onAddComment={() => addNewCommentHandler(comment)}
                  />
                </div>
                <div className="post-comments__answer mr-2 sm:mr-8 space-y-3">
                  {comment.answers.map((item, index) => {
                    return (
                      <div key={item._id} className="relative">
                        <div
                          className={`answer-item border border-secondary-100 bg-secondary-50/80 rounded-xl p-2 sm:p-4 ${index + 1 === comment.answers.length && "last-item"}`}
                        >
                          <Comment
                            onAddComment={() => addNewCommentHandler(comment)}
                            comment={item}
                            key={item._id}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-secondary-500">برای این پست نظری ثبت نشده است</p>
        )}
      </div>
    </div>
  );
}
export default PostComments;
