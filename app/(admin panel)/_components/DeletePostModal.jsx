import { useQueryClient } from "@tanstack/react-query";
import postServices from "api/postServices";
import Button from "components/Button";
import Modal from "components/Modal";
import React from "react";
import toast from "react-hot-toast";

const DeletePostModal = ({ open, post, onClose }) => {
  const queryClient = useQueryClient();
  
  const deletePostHandler = async () => {
    try {
      const { data } = await postServices.deletePost(post._id);
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["get-posts"] });
      onClose();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Modal open={open} title="حذف پست" onClose={onClose}>
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
