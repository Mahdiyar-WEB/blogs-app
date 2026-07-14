import sanitizeHtml from "sanitize-html";

export function sanitizePostText(html: string = ""): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "h1",
      "h2",
      "h3",
      "p",
      "strong",
      "em",
      "u",
      "s",
      "ul",
      "ol",
      "li",
      "blockquote",
      "pre",
      "code",
      "a",
      "br",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      code: ["class"],
      p: ["style"],
      h1: ["style"],
      h2: ["style"],
      h3: ["style"],
      pre: ["class"],
    },
    allowedStyles: {
      "*": {
        "text-align": [/^left$/, /^center$/, /^right$/, /^justify$/],
      },
    },
    allowedSchemes: ["http", "https"],
  });
}
