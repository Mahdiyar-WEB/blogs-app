"use client";

import { useEffect, useRef } from "react";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";

if (!hljs.getLanguage("javascript")) {
  hljs.registerLanguage("javascript", javascript);
}

function PostBody({ html }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const blocks = contentRef.current.querySelectorAll("pre code");

    blocks.forEach((block) => {
      if (!block.className.includes("language-")) {
        block.classList.add("language-javascript");
      }
      try {
        hljs.highlightElement(block);
      } catch (error) {}
    });
  }, [html]);

  return (
    <article className="p-4 sm:p-8 lg:p-12">
      <div
        ref={contentRef}
        dir="rtl"
        className="article-content prose prose-secondary max-w-none prose-headings:font-bold prose-headings:text-secondary-900 prose-h1:text-2xl sm:prose-h1:text-3xl lg:prose-h1:text-4xl prose-h2:text-xl sm:prose-h2:text-2xl lg:prose-h2:text-3xl prose-h3:text-lg sm:prose-h3:text-xl lg:prose-h3:text-2xl prose-h4:text-base sm:prose-h4:text-lg lg:prose-h4:text-xl prose-h5:text-sm sm:prose-h5:text-base lg:prose-h5:text-lg prose-h6:text-xs sm:prose-h6:text-sm lg:prose-h6:text-base prose-p:text-secondary-700 prose-p:text-sm sm:prose-p:text-base lg:prose-p:text-lg prose-p:leading-7 sm:prose-p:leading-8 lg:prose-p:leading-9prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-secondary-900 prose-li:text-secondary-700 prose-li:text-sm sm:prose-li:text-base prose-blockquote:border-primary-500 prose-blockquote:text-secondary-600 prose-img:rounded-xl prose-hr:border-secondary-200 prose-code:before:content-none prose-code:after:content-none  [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:text-left [&_pre]:dir-ltr [&_pre_code]:block"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}

export default PostBody;
