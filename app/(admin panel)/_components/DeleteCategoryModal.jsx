import Button from "components/Button";
import Modal from "components/Modal";
import useDeleteCategory from "hooks/categories/useDeleteCategory";
import useDeleteUser from "hooks/users/useDeleteUser";
import React from "react";

const DeleteCategoryModal = ({ category, onClose }) => {
  const { deleteCategory } = useDeleteCategory();

  const deleteCategoryHandler = async () => {
    deleteCategory(category?._id);
    onClose();
  };

  return (
    <Modal open={!!category} title="حذف پست" onClose={onClose}>
      <p className="flex gap-2 mb-5">
        <span>آیا از حذف دسته بندی</span>
        <span className="font-semibold">&quot;{category?.title}&quot;</span>
        <span>اطمینان دارید؟</span>
      </p>
      <div className="flex gap-3 justify-end">
        <Button className="px-4 py-2" variant="secondary" onClick={onClose}>
          خیر
        </Button>
        <Button
          className="px-5 py-2"
          variant="danger"
          onClick={() => deleteCategoryHandler()}
        >
          بله
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteCategoryModal;
