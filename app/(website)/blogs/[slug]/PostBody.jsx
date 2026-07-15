"use client";

import { useEffect, useRef } from "react";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";

hljs.registerLanguage("javascript", javascript);

function PostBody({ html }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const blocks = contentRef.current.querySelectorAll("pre code");

    blocks.forEach((block) => {
      if (!block.className.includes("language-")) {
        block.classList.add("language-javascript");
      }

      hljs.highlightElement(block);
    });
  }, [html]);

  return (
    <article className="p-5 sm:p-8 lg:p-12">
      <div
        ref={contentRef}
        dir="rtl"
        className="article-content prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-secondary-900 prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-p:text-secondary-700 prose-p:leading-10 prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-secondary-900 prose-li:text-secondary-700 prose-blockquote:border-primary-500 prose-blockquote:text-secondary-600 prose-img:rounded-xl prose-hr:border-secondary-200 prose-code:before:content-none prose-code:after:content-none [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:text-left [&_pre]:dir-ltr [&_pre_code]:block"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}

export default PostBody;
