"use client";
import Button from "components/Button";
import TextArea from "components/TextArea";
import { createComment } from "lib/actions";
import React, { useState } from "react";

const CommentForm = ({ parentId, postId }) => {
  const [value, setValue] = useState("");

  return (
    <form
      className="space-y-5 mt-2"
      action={createComment.bind(null, postId, parentId)}
    >
      <TextArea
        name="comment"
        value={value}
        label="متن نظر"
        onChange={(e) => setValue(e.target.value)}
      />
      <Button type="submit" className="w-full rounded-sm">
        {parent ? "ثبت پاسخ" : "ثبت نظر جدید"}
      </Button>
    </form>
  );
};

export default CommentForm;
