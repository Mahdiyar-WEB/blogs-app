"use client";
import commentServices from "api/commentServices";
import Button from "components/Button";
import SubmitButton from "components/SubmitButton";
import TextArea from "components/TextArea";
import React, { useState } from "react";
import toast from "react-hot-toast";

const CommentForm = ({ parentId, postId }) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await commentServices.addNewComment({
        postId,
        text: value,
        parentId,
      });
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.message);
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
      <SubmitButton
        loading={loading}
        className="w-full rounded-md"
      >
        {parent ? "ثبت پاسخ" : "ثبت نظر جدید"}
      </SubmitButton>
    </form>
  );
};

export default CommentForm;
