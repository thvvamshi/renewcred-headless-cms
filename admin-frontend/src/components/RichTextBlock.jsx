import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Table as TableIcon,
} from "lucide-react";

const extensions = [
  StarterKit,
  Table.configure({ resizable: true }),
  TableRow,
  TableHeader,
  TableCell,
];

export default function RichTextBlock({ data = {}, onChange }) {
  const editor = useEditor({
    extensions,
    content:
      data?.json && typeof data.json === "object" && data.json.type === "doc"
        ? data.json
        : data?.html || "<p></p>",
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none",
      },
    },
    onUpdate({ editor }) {
      onChange({
        ...data,
        json: editor.getJSON(),
        html: editor.getHTML(),
        text: editor.getText(),
      });
    },
  });

  useEffect(() => {
    if (!editor) return;

    const current = editor.getHTML();

    if (data?.html && data.html !== current) {
      editor.commands.setContent(
        data?.json && typeof data.json === "object" && data.json.type === "doc"
          ? data.json
          : data?.html || "<p></p>",
        false,
      );
    }
  }, [data?.html, data?.json, editor]);

  if (!editor) return null;

  return (
    <div className="rounded-md border border-line">
      <div className="flex flex-wrap gap-1 border-b border-line bg-shell p-2">
        <ToolbarButton
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
          title="Bold"
        >
          <Bold size={15} />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="Italic"
        >
          <Italic size={15} />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title="Bullet list"
        >
          <List size={15} />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          title="Ordered list"
        >
          <ListOrdered size={15} />
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          title="Quote"
        >
          <Quote size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
          title="Insert table"
        >
          <TableIcon size={15} />
        </ToolbarButton>
      </div>
      <EditorContent editor={editor} className="p-4" />
    </div>
  );
}

function ToolbarButton({ active, onClick, title, children }) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-md border ${
        active ? "border-brand bg-red-50 text-brand" : "border-line bg-white"
      }`}
    >
      {children}
    </button>
  );
}
