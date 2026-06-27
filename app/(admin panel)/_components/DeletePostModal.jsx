import Button from "components/Button";
import Modal from "components/Modal";
import useDeletePost from "hooks/useDeletePost";
import React from "react";

const DeletePostModal = ({ post, onClose }) => {
  const { deletePost } = useDeletePost();

  const deletePostHandler = async () => {
    deletePost(post?._id);
    onClose();
  };

  return (
    <Modal open={!!post} title="حذف پست" onClose={onClose}>
      <p className="flex gap-2 mb-5">
        <span>آیا از حذف پست</span>
        <span className="font-semibold">&quot;{post?.title}&quot;</span>
        <span>اطمینان دارید؟</span>
      </p>
      <div className="flex gap-3 justify-end">
        <Button className="px-4 py-2" variant="secondary" onClick={onClose}>
          خیر
        </Button>
        <Button
          className="px-5 py-2"
          variant="danger"
          onClick={() => deletePostHandler()}
        >
          بله
        </Button>
      </div>
    </Modal>
  );
};

export default DeletePostModal;
