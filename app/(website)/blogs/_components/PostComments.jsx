"use client";
import { useState } from "react";
import Comment from "./Comment";
import { useRouter } from "next/navigation";
import Button from "components/Button";
import Modal from "components/Modal";
import CommentForm from "./CommentForm";
import { useUser } from "context/UserContext";
import toPersianDigits from "utils/toPersianDigits";

function PostComments({ post }) {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [parent, setParent] = useState(null);
  const router = useRouter();

  const onCloseHandler = () => setIsOpen(false);

  const addNewCommentHandler = (parent) => {
    if (!user) {
      router.push('/login');
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
          parentId={parent ? parent?._id : ""}
          postId={post._id}
          onClose={onCloseHandler}
        />
      </Modal>

      <div className="space-y-8 post-comments bg-white shadow-md border border-secondary-100 rounded-2xl py-6 px-3 lg:px-8">
        <div className="flex items-center flex-row justify-between gap-y-3 mb-5 pb-5 border-b border-secondary-100">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-6 rounded-full bg-primary-600" />
            <h2 className="text-xl font-bold text-secondary-800">
              نظرات{" "}
              <span className="text-secondary-400 font-normal">
                ({toPersianDigits(post.commentsCount)})
              </span>
            </h2>
          </div>
          <Button
            onClick={() => addNewCommentHandler(null)}
            variant="primary"
            className="flex text-sm md:text-base items-center rounded-lg gap-1 py-2 bg-primary-700 hover:bg-primary-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
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

        {post.comments.length > 0 ? (
          post.comments.map((comment) => (
            <div key={comment._id}>
              <div className="border border-secondary-200 rounded-xl p-2 sm:p-4 mb-3">
                <Comment
                  comment={comment}
                  onAddComment={() => addNewCommentHandler(comment)}
                />
              </div>
              <div className="post-comments__answer mr-2 sm:mr-8 space-y-3">
                {comment.answers.map((item, index) => (
                  <div key={item._id} className="relative">
                    <div
                      className={`answer-item border border-secondary-100 bg-secondary-50/80 rounded-xl p-2 sm:p-4 ${
                        index + 1 === comment.answers.length && "last-item"
                      }`}
                    >
                      <Comment
                        onAddComment={() => addNewCommentHandler(comment)}
                        comment={item}
                        key={item._id}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-secondary-500">برای این پست نظری ثبت نشده است</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default PostComments;
