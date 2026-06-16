"use client";
import Button from "components/Button";
import TextArea from "components/TextArea";
import React, { useState } from "react";

const CommentForm = ({ parent }) => {
  const [value, setValue] = useState("");

  const onChangeHandler = (e) => {
    setValue(e.target.value);
  };

  return (
    <form className="space-y-5">
      <TextArea value={value} label='متن نظر' onChange={(e) => onChangeHandler(e)} />
      <Button className="w-full rounded-sm">{parent ? "ثبت پاسخ" : "ثبت نظر جدید"}</Button>
    </form>
  );
};

export default CommentForm;
