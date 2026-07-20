"use client";

import { BlockMath } from "react-katex";
import { Link2 } from "lucide-react";

export default function BlockRenderer({ blocks }) {
  return (
    <div>
      {blocks.map((block, index) => {
        const previous = blocks[index - 1]?.type;
        const spacing = block.type === "header" && index > 0 ? "mt-[58px]" : block.type === "paragraph" ? "mt-[19px]" : "mt-[28px]";

        switch (block.type) {
          case "header":
            return <HeaderBlock key={block._id || index} block={block} className={spacing} />;
          case "paragraph":
            return <ParagraphBlock key={block._id || index} block={block} className={previous === "header" ? "mt-[18px]" : spacing} />;
          case "list":
            return <ListBlock key={block._id || index} block={block} className={spacing} />;
          case "table":
            return <TableBlock key={block._id || index} block={block} className={spacing} />;
          case "equation":
            return <EquationBlock key={block._id || index} block={block} className={spacing} />;
          case "callout":
            return <CalloutBlock key={block._id || index} block={block} className={spacing} />;
          case "divider":
            return <hr key={block._id || index} className="border-line" />;
          default:
            return null;
        }
      })}
    </div>
  );
}

function HeaderBlock({ block, className = "" }) {
  const level = block.data.level || 2;
  const Heading = level === 4 ? "h4" : level === 3 ? "h3" : "h2";

  return (
    <section id={block.data.anchor} className={`group scroll-mt-12 pt-1 ${className}`}>
      <div className="flex items-center gap-4 border-b border-line pb-[13px]">
        <Heading className={`${level === 2 ? "text-[25px]" : "text-[23px]"} flex-1 font-semibold leading-tight tracking-normal text-ink`}>
          <span className="mr-[13px]">{block.data.number}</span>
          {block.data.title}
        </Heading>
        <a
          href={`#${block.data.anchor}`}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-white text-softInk transition hover:border-renew hover:text-renew"
          aria-label={`Copy link to ${block.data.title}`}
        >
          <Link2 size={16} />
        </a>
      </div>
    </section>
  );
}

function ParagraphBlock({ block, className = "" }) {
  return (
    <div
      className={`article-rich text-[15px] font-medium leading-[1.55] text-softInk ${className}`}
      dangerouslySetInnerHTML={{ __html: block.data.html || `<p>${block.data.text || ""}</p>` }}
    />
  );
}

function ListBlock({ block, className = "" }) {
  const ordered = block.data.style === "ordered";
  const Tag = ordered ? "ol" : "ul";

  return (
    <Tag className={`${ordered ? "list-decimal" : "list-disc"} ml-6 space-y-2 text-[15px] font-medium leading-7 text-softInk ${className}`}>
      {(block.data.items || []).map((item, index) => (
        <ListItem key={`${item.text}-${index}`} item={item} ordered={ordered} />
      ))}
    </Tag>
  );
}

function ListItem({ item, ordered }) {
  const ChildTag = ordered ? "ol" : "ul";

  return (
    <li>
      {item.text}
      {item.children?.length ? (
        <ChildTag className={`${ordered ? "list-decimal" : "list-disc"} ml-6 mt-2 space-y-1`}>
          {item.children.map((child, index) => (
            <ListItem key={`${child.text}-${index}`} item={child} ordered={ordered} />
          ))}
        </ChildTag>
      ) : null}
    </li>
  );
}

function TableBlock({ block, className = "" }) {
  return (
    <figure className={`overflow-hidden rounded-lg border border-line bg-white shadow-sm ${className}`}>
      {block.data.caption ? <figcaption className="border-b border-line px-5 py-4 text-[15px] font-semibold text-ink">{block.data.caption}</figcaption> : null}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-[15px]">
          <thead className="bg-[#f1f1f0] text-ink">
            <tr>
              {(block.data.headers || []).map((header) => (
                <th key={header} className="border-b border-line px-5 py-4 font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-softInk">
            {(block.data.rows || []).map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-line last:border-b-0">
                {row.map((cell, cellIndex) => (
                  <td key={`${rowIndex}-${cellIndex}`} className="px-5 py-4 font-medium">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

function EquationBlock({ block, className = "" }) {
  return (
    <figure className={`rounded-lg border border-line bg-white px-6 py-5 ${className}`}>
      <BlockMath math={block.data.latex || ""} />
      {block.data.caption ? <figcaption className="mt-3 text-center text-[13px] font-medium text-softInk">{block.data.caption}</figcaption> : null}
    </figure>
  );
}

function CalloutBlock({ block, className = "" }) {
  return (
    <aside className={`rounded-lg border border-renew/25 bg-red-50 px-5 py-4 ${className}`}>
      {block.data.title ? <h3 className="mb-2 text-lg font-semibold text-ink">{block.data.title}</h3> : null}
      <div className="article-rich text-[16px] leading-7 text-softInk" dangerouslySetInnerHTML={{ __html: block.data.html || "" }} />
    </aside>
  );
}
