"use client";
import commentServices from "api/commentServices";
import SubmitButton from "components/SubmitButton";
import TextArea from "components/TextArea";
import React, { SubmitEvent, useState } from "react";
import toast from "react-hot-toast";

const CommentForm = ({
  parentId = "",
  postId,
  onClose,
}: {
  parentId?: string;
  postId: string;
  onClose: () => void;
}) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.length < 5) {
      toast.error("حداقل ۵ حرف وارد کنید");
      return;
    }
    setLoading(true);
    try {
      const { data } = await commentServices.addNewComment({
        postId,
        text: value,
        parentId,
      });
      toast.success(data.message);
      onClose();
    } catch (error) {
      const message = error instanceof Error ? error.message : "error";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form className="space-y-5 mt-2" onSubmit={onSubmitHandler}>
      <TextArea
        name="comment"
        value={value}
        label="متن نظر"
        onChange={(e) => setValue(e.target.value)}
      />
      <SubmitButton loading={loading} className="w-full rounded-md">
        {parentId ? "ثبت پاسخ" : "ثبت نظر جدید"}
      </SubmitButton>
    </form>
  );
};

export default CommentForm;
