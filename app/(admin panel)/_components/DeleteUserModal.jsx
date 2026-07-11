import Button from "components/Button";
import Modal from "components/Modal";
import { useUser } from "context/UserContext";
import useDeleteUser from "hooks/users/useDeleteUser";
import { useRouter } from "next/navigation";
import React from "react";

const DeleteUserModal = ({ user: selectedUser, onClose }) => {
  const { deleteUser } = useDeleteUser();
  const router = useRouter();
  const { user, logout } = useUser();

  const deleteUserHandler = async () => {
    if (user?._id === selectedUser?._id) {
      deleteUser(selectedUser?._id);
      logout();
      router.push("/");
    } else {
      deleteUser(selectedUser?._id);
    }
    onClose();
  };

  return (
    <Modal open={!!selectedUser} title="حذف پست" onClose={onClose}>
      <p className="flex gap-2 mb-5">
        <span>آیا از حذف کاربر</span>
        <span className="font-semibold">&quot;{selectedUser?.name}&quot;</span>
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
