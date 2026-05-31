import Image from "next/image";
import React from "react";

const Post = ({ title, coverImageUrl }) => {
  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-4 border rounded-md ">
      <div className="relative aspect-video h-56 rounded-md overflow-hidden">
        <Image
          fill
          quality={75}
          alt={title}
          sizes="100%"
          src={coverImageUrl}
          className="object-cover object-center hover:scale-110 transition-all duration-200 ease-out"
        />
      </div>
      {title}
    </div>
  );
};

export default Post;
