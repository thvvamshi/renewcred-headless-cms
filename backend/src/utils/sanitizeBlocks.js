import sanitizeHtml from "sanitize-html";

const richTextOptions = {
  allowedTags: [
    "p",
    "br",
    "strong",
    "em",
    "u",
    "s",
    "a",
    "ul",
    "ol",
    "li",
    "blockquote",
    "code",
    "pre",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
    "sup",
    "sub",
    "span"
  ],
  allowedAttributes: {
    a: ["href", "target", "rel"],
    span: ["class"],
    th: ["colspan", "rowspan"],
    td: ["colspan", "rowspan"]
  },
  allowedSchemes: ["http", "https", "mailto"],
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer", target: "_blank" })
  }
};

function textOnly(value) {
  return sanitizeHtml(String(value || ""), { allowedTags: [], allowedAttributes: {} }).trim();
}

function cleanCell(value) {
  return textOnly(value).slice(0, 500);
}

function sanitizeTable(data = {}) {
  return {
    caption: textOnly(data.caption),
    headers: Array.isArray(data.headers) ? data.headers.map(cleanCell) : [],
    rows: Array.isArray(data.rows)
      ? data.rows.map((row) => (Array.isArray(row) ? row.map(cleanCell) : []))
      : []
  };
}

function sanitizeListItems(items = []) {
  if (!Array.isArray(items)) return [];

  return items.map((item) => ({
    text: textOnly(item.text ?? item),
    children: sanitizeListItems(item.children)
  }));
}

export function sanitizeBlocks(blocks = []) {
  if (!Array.isArray(blocks)) return [];

  return blocks.map((block) => {
    const data = block.data || {};

    switch (block.type) {
      case "header":
        return {
          type: "header",
          data: {
            title: textOnly(data.title),
            number: textOnly(data.number),
            anchor: textOnly(data.anchor),
            level: Number(data.level || 2)
          }
        };
      case "paragraph":
        return {
          type: "paragraph",
          data: {
            html: sanitizeHtml(data.html || `<p>${textOnly(data.text)}</p>`, richTextOptions),
            json: data.json || null,
            text: textOnly(data.text)
          }
        };
      case "list":
        return {
          type: "list",
          data: {
            style: data.style === "ordered" ? "ordered" : "unordered",
            items: sanitizeListItems(data.items)
          }
        };
      case "table":
        return {
          type: "table",
          data: sanitizeTable(data)
        };
      case "equation":
        return {
          type: "equation",
          data: {
            latex: textOnly(data.latex),
            caption: textOnly(data.caption)
          }
        };
      case "callout":
        return {
          type: "callout",
          data: {
            title: textOnly(data.title),
            html: sanitizeHtml(data.html || "", richTextOptions)
          }
        };
      case "divider":
        return { type: "divider", data: {} };
      default:
        return { type: "paragraph", data: { html: "<p></p>", text: "" } };
    }
  });
}
