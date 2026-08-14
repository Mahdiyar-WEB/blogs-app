import { ArrowUturnRightIcon } from "@heroicons/react/24/outline";
import Button from "components/Button";
import { PostComment } from "types/postType";
import Image from "next/image";

function Comment({
  comment,
  onAddComment,
}: {
  comment: PostComment;
  onAddComment: () => void;
}) {
  return (
    <>
      <div className="flex items-center justify-between mb-5 border-b border-b-secondary-200/60 pb-2">
        <div className="flex items-center gap-2">
          <div className="relative aspect-[5/5] sm:aspect-[16/10] lg:aspect-[21/9] w-10 h-10">
            <Image
              alt={comment.user?.name || "-"}
              className={`object-cover object-center ${
                comment.user?.avatarUrl &&
                "rounded-full ring-1 ring-secondary-300"
              }`}
              fill
              src={comment.user?.avatarUrl || "/avatar.svg"}
            />
          </div>

          <div className="text-sm w-full text-secondary-600">
            <span className="font-bold block mb-1">
              {comment.user?.name || "حساب حذف شده"}
            </span>
            <span className="block text-secondary-500 text-xs">
              {comment.createdAt}
            </span>
          </div>
        </div>
        <div>
          {comment.openToComment && (
            <Button
              onClick={onAddComment}
              variant="secondary"
              className="text-sm flex gap-x-1 p-1 rounded-lg text-secondary-500 bg-secondary-200"
            >
              <span className="ml-1">
                <ArrowUturnRightIcon className="w-4" />
              </span>
              <span>پاسخ</span>
            </Button>
          )}
        </div>
      </div>
      <p className="text-secondary-700 leading-loose lg:leading-8 text-xs lg:text-base">
        {comment.content.text}
      </p>
    </>
  );
}
export default Comment;
