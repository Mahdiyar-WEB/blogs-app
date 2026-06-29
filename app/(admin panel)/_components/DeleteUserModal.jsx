import Button from "components/Button";
import Modal from "components/Modal";
import useDeleteUser from "hooks/users/useDeleteUser";
import React from "react";

const DeleteUserModal = ({ user, onClose }) => {
  const { deleteUser } = useDeleteUser();

  const deleteUserHandler = async () => {
    deleteUser(user?._id);
    onClose();
  };

  return (
    <Modal open={!!user} title="حذف پست" onClose={onClose}>
      <p className="flex gap-2 mb-5">
        <span>آیا از حذف کاربر</span>
        <span className="font-semibold">&quot;{user?.name}&quot;</span>
        <span>اطمینان دارید؟</span>
      </p>
      <div className="flex gap-3 justify-end">
        <Button className="px-4 py-2" variant="secondary" onClick={onClose}>
          خیر
        </Button>
        <Button
          className="px-5 py-2"
          variant="danger"
          onClick={() => deleteUserHandler()}
        >
          بله
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteUserModal;
