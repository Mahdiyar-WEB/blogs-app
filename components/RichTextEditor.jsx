"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";

const decodeHtml = (html) => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = html;
  return textarea.value;
};

const ToolbarButton = ({ active = false, onClick, children }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-2 text-sm rounded-lg border transition-colors
      ${
        active
          ? "bg-primary-500 text-white border-primary-500"
          : "bg-white hover:bg-secondary-50 border-secondary-200"
      }`}
    >
      {children}
    </button>
  );
};

const RichTextEditor = ({ initialValue = "", onChange }) => {
  const editor = useEditor(
    {
      immediatelyRender: false,

      extensions: [
        StarterKit.configure({
          codeBlock: {
            HTMLAttributes: {
              class: "rounded-lg bg-gray-900 text-white p-4 font-mono text-sm",
              dir: "ltr",
            },
          },
          blockquote: {
            HTMLAttributes: {
              class: "border-r-4 pr-4 italic text-secondary-600",
            },
          },
        }),

        Underline,

        Link.configure({
          openOnClick: false,
          autolink: true,
        }),

        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),

        Placeholder.configure({
          placeholder: "شروع به نوشتن مقاله کنید...",
        }),
      ],

      content: initialValue,

      editorProps: {
        attributes: {
          class:
            "prose prose-lg max-w-none focus:outline-none min-h-[400px] p-5 rtl",
        },

        transformPastedHTML(html) {
          return html;
        },

        handlePaste(view, event) {
          const clipboardData = event.clipboardData;

          if (!clipboardData) return false;

          const html = clipboardData.getData("text/html");
          const text = clipboardData.getData("text/plain");

          if (html) {
            return false;
          }

          if (text && /<\/?[a-z][\s\S]*>/i.test(text)) {
            const decoded = decodeHtml(text);

            const parser = new DOMParser();

            const doc = parser.parseFromString(decoded, "text/html");

            const fragment = view.state.schema.nodeFromJSON({
              type: "doc",
              content: Array.from(doc.body.childNodes).map((node) => {
                const html = node.outerHTML || node.textContent;

                return {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: html,
                    },
                  ],
                };
              }),
            });

            view.dispatch(view.state.tr.replaceSelection(fragment));

            return true;
          }

          return false;
        },
      },

      onUpdate: ({ editor }) => {
        onChange(editor.getHTML());
      },
    },
    [],
  );

  if (!editor) return null;

  const addLink = () => {
    const previousUrl = editor.getAttributes("link").href;

    const url = window.prompt("آدرس لینک را وارد کنید", previousUrl || "");

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }

    editor.chain().focus().setLink({ href: url }).run();
  };

  return (
    <div className="border border-secondary-200 rounded-xl overflow-hidden">
      <div className="flex flex-wrap gap-2 p-3 border-b border-secondary-200 bg-secondary-0">
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()}>
          Undo
        </ToolbarButton>

        <ToolbarButton onClick={() => editor.chain().focus().redo().run()}>
          Redo
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive("heading", { level: 1 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          H1
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive("heading", { level: 2 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive("heading", { level: 3 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          H3
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          B
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          I
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          U
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          S
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          • List
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1. List
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          Quote
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive("code")}
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          Code
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive("codeBlock")}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          Code Block
        </ToolbarButton>

        <ToolbarButton active={editor.isActive("link")} onClick={addLink}>
          Link
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive({
            textAlign: "right",
          })}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          Right
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive({
            textAlign: "center",
          })}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          Center
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive({
            textAlign: "left",
          })}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          Left
        </ToolbarButton>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
