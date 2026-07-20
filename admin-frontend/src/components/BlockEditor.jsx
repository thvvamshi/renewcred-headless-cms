import { ArrowDown, ArrowUp, Copy, FileText, Heading2, List, Plus, Sigma, Table, Trash2 } from "lucide-react";
import EquationEditor from "./EquationEditor";
import RichTextBlock from "./RichTextBlock";
import TableEditor from "./TableEditor";

function makeBlock(type) {
  const id = crypto.randomUUID();
  const base = { _id: id, type };

  if (type === "header") {
    return { ...base, data: { number: "1.0", title: "New section", anchor: `section-${id.slice(0, 6)}`, level: 2 } };
  }
  if (type === "paragraph") {
    return { ...base, data: { html: "<p>Start writing...</p>", text: "Start writing...", json: null } };
  }
  if (type === "list") {
    return { ...base, data: { style: "unordered", items: [{ text: "List item", children: [] }] } };
  }
  if (type === "table") {
    return { ...base, data: { caption: "", headers: ["Column 1", "Column 2"], rows: [["", ""]] } };
  }
  if (type === "equation") {
    return { ...base, data: { latex: "E_{reduction}=E_{baseline}-E_{project}", caption: "" } };
  }
  return { ...base, data: {} };
}

const blockButtons = [
  ["header", Heading2, "Heading"],
  ["paragraph", FileText, "Text"],
  ["list", List, "List"],
  ["table", Table, "Table"],
  ["equation", Sigma, "Formula"]
];

export default function BlockEditor({ page, onChange }) {
  const blocks = page.blocks || [];

  function setBlocks(nextBlocks) {
    onChange(nextBlocks);
  }

  function updateBlock(index, data) {
    setBlocks(blocks.map((block, blockIndex) => (blockIndex === index ? { ...block, data } : block)));
  }

  function addBlock(type) {
    setBlocks([...blocks, makeBlock(type)]);
  }

  function removeBlock(index) {
    setBlocks(blocks.filter((_, blockIndex) => blockIndex !== index));
  }

  function duplicateBlock(index) {
    const copy = JSON.parse(JSON.stringify(blocks[index]));
    copy._id = crypto.randomUUID();
    setBlocks([...blocks.slice(0, index + 1), copy, ...blocks.slice(index + 1)]);
  }

  function moveBlock(index, direction) {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= blocks.length) return;
    const nextBlocks = [...blocks];
    const [item] = nextBlocks.splice(index, 1);
    nextBlocks.splice(nextIndex, 0, item);
    setBlocks(nextBlocks);
  }

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2">
        {blockButtons.map(([type, Icon, label]) => (
          <button
            key={type}
            type="button"
            onClick={() => addBlock(type)}
            className="inline-flex items-center gap-2 rounded-md border border-line bg-white px-3 py-2 text-sm font-semibold transition hover:border-ink"
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {blocks.map((block, index) => (
          <article key={block._id || index} className="rounded-lg border border-line bg-white">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">{block.type}</p>
                <p className="text-sm font-semibold">Block {index + 1}</p>
              </div>
              <div className="flex gap-1">
                <button type="button" onClick={() => moveBlock(index, -1)} className="h-9 w-9 rounded-md border border-line" title="Move up">
                  <ArrowUp size={15} className="mx-auto" />
                </button>
                <button type="button" onClick={() => moveBlock(index, 1)} className="h-9 w-9 rounded-md border border-line" title="Move down">
                  <ArrowDown size={15} className="mx-auto" />
                </button>
                <button type="button" onClick={() => duplicateBlock(index)} className="h-9 w-9 rounded-md border border-line" title="Duplicate">
                  <Copy size={15} className="mx-auto" />
                </button>
                <button type="button" onClick={() => removeBlock(index)} className="h-9 w-9 rounded-md border border-line text-brand" title="Delete">
                  <Trash2 size={15} className="mx-auto" />
                </button>
              </div>
            </div>

            <div className="p-4">
              {block.type === "header" ? <HeaderEditor data={block.data} onChange={(data) => updateBlock(index, data)} /> : null}
              {block.type === "paragraph" ? <RichTextBlock data={block.data} onChange={(data) => updateBlock(index, data)} /> : null}
              {block.type === "list" ? <ListEditor data={block.data} onChange={(data) => updateBlock(index, data)} /> : null}
              {block.type === "table" ? <TableEditor data={block.data} onChange={(data) => updateBlock(index, data)} /> : null}
              {block.type === "equation" ? <EquationEditor data={block.data} onChange={(data) => updateBlock(index, data)} /> : null}
            </div>
          </article>
        ))}

        {blocks.length === 0 ? (
          <button
            type="button"
            onClick={() => addBlock("header")}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-line p-10 text-muted"
          >
            <Plus size={18} />
            Add the first content block
          </button>
        ) : null}
      </div>
    </div>
  );
}

function HeaderEditor({ data, onChange }) {
  return (
    <div className="grid gap-3 md:grid-cols-[120px_1fr_180px_100px]">
      <input
        value={data.number || ""}
        onChange={(event) => onChange({ ...data, number: event.target.value })}
        className="rounded-md border border-line px-3 py-2.5"
        placeholder="1.0"
      />
      <input
        value={data.title || ""}
        onChange={(event) => onChange({ ...data, title: event.target.value })}
        className="rounded-md border border-line px-3 py-2.5"
        placeholder="Section title"
      />
      <input
        value={data.anchor || ""}
        onChange={(event) => onChange({ ...data, anchor: event.target.value })}
        className="rounded-md border border-line px-3 py-2.5"
        placeholder="section-anchor"
      />
      <select
        value={data.level || 2}
        onChange={(event) => onChange({ ...data, level: Number(event.target.value) })}
        className="rounded-md border border-line bg-white px-3 py-2.5"
      >
        <option value={2}>H2</option>
        <option value={3}>H3</option>
        <option value={4}>H4</option>
      </select>
    </div>
  );
}

function ListEditor({ data, onChange }) {
  const text = (data.items || []).map((item) => item.text).join("\n");

  function handleText(value) {
    onChange({
      ...data,
      items: value
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean)
        .map((item) => ({ text: item, children: [] }))
    });
  }

  return (
    <div className="grid gap-3">
      <select
        value={data.style || "unordered"}
        onChange={(event) => onChange({ ...data, style: event.target.value })}
        className="w-fit rounded-md border border-line bg-white px-3 py-2.5"
      >
        <option value="unordered">Unordered</option>
        <option value="ordered">Ordered</option>
      </select>
      <textarea
        value={text}
        onChange={(event) => handleText(event.target.value)}
        className="min-h-32 rounded-md border border-line px-3 py-2.5"
        placeholder="One item per line"
      />
    </div>
  );
}
