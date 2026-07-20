import { FileText, Sigma, Table } from "lucide-react";

export default function PreviewPanel({ page }) {
  return (
    <aside className="h-fit rounded-lg border border-line bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Public preview</p>
          <h2 className="text-xl font-semibold">{page.title}</h2>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${page.status === "published" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>
          {page.status}
        </span>
      </div>
      <p className="mb-6 text-sm leading-6 text-muted">{page.summary}</p>
      <div className="space-y-4">
        {(page.blocks || []).map((block, index) => (
          <div key={block._id || index} className="rounded-md border border-line p-3">
            {block.type === "header" ? <h3 className="text-lg font-semibold">{block.data.number} {block.data.title}</h3> : null}
            {block.type === "paragraph" ? (
              <div className="text-sm leading-6 text-muted" dangerouslySetInnerHTML={{ __html: block.data.html || "" }} />
            ) : null}
            {block.type === "list" ? <PreviewList items={block.data.items || []} ordered={block.data.style === "ordered"} /> : null}
            {block.type === "table" ? (
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-muted">
                <Table size={15} />
                Table: {block.data.caption || "Untitled"}
              </p>
            ) : null}
            {block.type === "equation" ? (
              <p className="inline-flex items-center gap-2 font-mono text-sm text-muted">
                <Sigma size={15} />
                {block.data.latex}
              </p>
            ) : null}
            {!["header", "paragraph", "list", "table", "equation"].includes(block.type) ? (
              <p className="inline-flex items-center gap-2 text-sm text-muted">
                <FileText size={15} />
                {block.type}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </aside>
  );
}

function PreviewList({ items, ordered }) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag className={`text-sm leading-6 text-muted ${ordered ? "list-decimal" : "list-disc"} pl-5`}>
      {items.map((item, index) => (
        <li key={`${item.text}-${index}`}>{item.text}</li>
      ))}
    </Tag>
  );
}
