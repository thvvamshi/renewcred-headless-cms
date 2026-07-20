"use client";

import { useMemo, useState } from "react";
import { ArrowUp, ChevronDown, Search } from "lucide-react";
import BlockRenderer from "./BlockRenderer";
import StandardBadge from "./StandardBadge";

export default function StandardsShell({ page }) {
  const [query, setQuery] = useState("");
  const [versionOpen, setVersionOpen] = useState(false);
  const toc = useMemo(() => {
    const source = page.toc?.length
      ? page.toc
      : (page.blocks || [])
          .filter((block) => block.type === "header")
          .map((block) => ({
            id: block.data.anchor,
            label: `${block.data.number || ""} ${block.data.title || ""}`.trim(),
            level: block.data.level || 2
          }));

    return source.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));
  }, [page.blocks, page.toc, query]);

  return (
    <main className="px-4 pt-14 sm:px-8 lg:px-[78px] lg:pt-16">
      <section className="mx-auto max-w-[1284px]">
        <div className="grid gap-y-7 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-x-16">
          <div className="lg:col-span-2">
            <StandardBadge>{page.eyebrow || "Standards"}</StandardBadge>
            <h1 className="mt-[21px] text-[48px] font-semibold italic leading-none tracking-normal text-ink sm:text-[54px]">{page.title}</h1>
            <div className="mt-[22px] grid gap-10 lg:grid-cols-[1fr_300px]">
              <p className="max-w-[760px] text-[15px] font-medium leading-[1.55] text-softInk">{page.summary}</p>
              <div className="hidden border-b border-line lg:block" />
            </div>
          </div>

          <aside className="relative lg:pt-4">
            <div className="sticky top-8">
              <label className="relative block max-w-[224px]">
                <span className="sr-only">Search document</span>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search"
                  className="h-[41px] w-full rounded-full border border-line bg-white px-5 pr-11 text-[13px] font-medium text-ink outline-none shadow-sm placeholder:text-softInk/70"
                />
                <Search size={17} className="absolute right-4 top-1/2 -translate-y-1/2 text-softInk" />
              </label>

              <div className="relative mt-[28px] max-w-[224px]">
                <p className="mb-2 text-[13px] font-semibold text-softInk">Version</p>
                <button
                  type="button"
                  onClick={() => setVersionOpen((value) => !value)}
                  className="flex w-full items-center justify-between border-b border-line pb-[14px] text-left text-[13px] font-semibold text-softInk"
                >
                  <span>{page.version?.label || "v1.0.0"} - {page.version?.dateLabel || ""}</span>
                  <ChevronDown size={16} />
                </button>
                {versionOpen ? <VersionMenu versions={page.versions || []} /> : null}
              </div>

              <nav className="mt-[30px] max-w-[224px] space-y-[9px] text-[13.5px] font-medium text-softInk">
                {toc.map((item) => (
                  <a
                    key={item.id || item.label}
                    href={`#${item.id}`}
                    className={`block transition hover:text-renew ${item.level > 2 ? "pl-5 text-[13px]" : ""} ${
                      item.label.startsWith("1.0") ? "text-renew" : ""
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <article className="min-w-0 lg:pt-0">
            <BlockRenderer blocks={page.blocks || []} />
          </article>
        </div>
      </section>

      <a
        href="#"
        className="fixed right-4 top-2/3 hidden -translate-y-1/2 rotate-[-90deg] items-center gap-2 text-[12px] font-semibold uppercase tracking-normal text-softInk xl:inline-flex"
      >
        Back to top
        <ArrowUp size={14} aria-hidden="true" />
      </a>
    </main>
  );
}

function VersionMenu({ versions }) {
  const menuVersions = versions.length ? versions : [{ label: "v1.0.0", status: "Certified", dateLabel: "12 Jul 2025", actions: [] }];

  return (
    <div className="absolute left-0 top-[70px] z-20 w-[290px] rounded-md border border-line bg-white py-2 shadow-menu">
      {menuVersions.map((version, index) => (
        <div key={`${version.label}-${index}`} className="group relative">
          <a href={version.actions?.[0]?.href || "#"} className="flex items-center justify-between px-4 py-3 transition hover:bg-red-50">
            <span>
              <span className="block text-[13px] font-bold text-ink">{version.label}</span>
              <span className="block text-[12px] font-medium text-softInk">{version.status} - {version.dateLabel}</span>
            </span>
            <ChevronDown size={15} className="-rotate-90" />
          </a>
          {version.actions?.length ? (
            <div className="absolute left-full top-0 hidden min-w-[250px] rounded-md border border-line bg-white py-2 shadow-menu group-hover:block">
              {version.actions.map((action) => (
                <a key={action.label} href={action.href || "#"} className="block px-4 py-3 transition hover:bg-red-50">
                  <span className="block text-[13px] font-bold text-ink">{action.label}</span>
                  <span className="block text-[12px] font-medium text-softInk">{action.description}</span>
                </a>
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
