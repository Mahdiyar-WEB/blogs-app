import Button from "components/Button";
import Modal from "components/Modal";
import useDeleteComment from "hooks/comments/useDeleteComment";
import React from "react";

const DeleteCommentModal = ({ comment, onClose }) => {
  const { deleteComment } = useDeleteComment();

  const deleteCommentHandler = async () => {
    deleteComment(comment?._id);
    onClose();
  };

  return (
    <Modal open={!!comment} title="حذف پست" onClose={onClose}>
      <p className="flex gap-2 mb-5">
        <span>آیا از حذف کامنت کاربر</span>
        <span className="font-semibold">&quot;{comment?.user?.name}&quot;</span>
        <span>اطمینان دارید؟</span>
      </p>
      <div className="flex gap-3 justify-end">
        <Button className="px-4 py-2" variant="secondary" onClick={onClose}>
          خیر
        </Button>
        <Button
          className="px-5 py-2"
          variant="danger"
          onClick={() => deleteCommentHandler()}
        >
          بله
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteCommentModal;
