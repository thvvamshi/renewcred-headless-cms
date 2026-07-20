import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Eye, FileText, LogOut, Plus, Save, Trash2 } from "lucide-react";

import BlockEditor from "./BlockEditor";
import PreviewPanel from "./PreviewPanel";

import { logout } from "../features/auth/authSlice";
import {
  fetchPage,
  fetchPages,
  savePage,
  deletePage,
  setSelectedPage,
} from "../features/content/contentSlice";

const emptyPage = {
  title: "Untitled standard",
  slug: "untitled-standard",
  eyebrow: "Standards",
  summary: "",
  category: "Standards",
  status: "draft",
  version: {
    label: "v1.0.0",
    dateLabel: "12 Jul 2025",
    status: "Draft",
  },
  versions: [],
  blocks: [],
};

export default function Dashboard() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { pages, selectedPage, status, saveStatus, error } = useSelector(
    (state) => state.content,
  );

  const [draft, setDraft] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(true);

  useEffect(() => {
    dispatch(fetchPages());
  }, [dispatch]);

  useEffect(() => {
    if (!selectedPage && pages.length > 0) {
      dispatch(fetchPage(pages[0]._id));
    }
  }, [dispatch, pages, selectedPage]);

  useEffect(() => {
    if (selectedPage) {
      setDraft(JSON.parse(JSON.stringify(selectedPage)));
    }
  }, [selectedPage]);

  const publishedCount = useMemo(
    () => pages.filter((page) => page.status === "published").length,
    [pages],
  );

  function selectPage(id) {
    dispatch(fetchPage(id));
  }

  function createNewPage() {
    setDraft(emptyPage);
    dispatch(setSelectedPage(emptyPage));
  }

  function updateDraft(patch) {
    setDraft((current) => ({
      ...current,
      ...patch,
    }));
  }

  function handleSave() {
    if (draft) {
      dispatch(savePage(draft));
    }
  }

  async function handleDelete(id, title) {
    const confirmed = window.confirm(
      `Delete "${title}"?\n\nThis action cannot be undone.`,
    );

    if (!confirmed) return;

    try {
      await dispatch(deletePage(id)).unwrap();

      const remaining = pages.filter((page) => page._id !== id);

      if (remaining.length > 0) {
        dispatch(fetchPage(remaining[0]._id));
      } else {
        setDraft(null);
        dispatch(setSelectedPage(null));
      }
    } catch (error) {
      alert(error.message || "Failed to delete page");
    }
  }

  return (
    <main className="min-h-screen bg-shell text-ink">
      <header className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-brand">RenewCred</p>
            <h1 className="text-xl font-semibold">Headless CMS</h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted md:inline">
              {user?.email}
            </span>

            <button
              type="button"
              onClick={() => setPreviewOpen((value) => !value)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line bg-white"
              title="Toggle preview"
            >
              <Eye size={18} />
            </button>

            <button
              type="button"
              onClick={() => dispatch(logout())}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line bg-white"
              title="Log out"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-[1500px] gap-5 px-5 py-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-lg border border-line bg-white p-4 shadow-sm">
          <div className="mb-4 grid grid-cols-2 gap-3">
            <div className="rounded-md border border-line p-3">
              <p className="text-2xl font-semibold">{pages.length}</p>
              <p className="text-xs text-muted">Pages</p>
            </div>

            <div className="rounded-md border border-line p-3">
              <p className="text-2xl font-semibold">{publishedCount}</p>
              <p className="text-xs text-muted">Published</p>
            </div>
          </div>

          <button
            type="button"
            onClick={createNewPage}
            className="mb-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-ink px-3 py-2.5 text-sm font-semibold text-white"
          >
            <Plus size={16} />
            New page
          </button>

          <div className="space-y-2">
            {status === "loading" && (
              <p className="text-sm text-muted">Loading pages...</p>
            )}

            {pages.map((page) => (
              <div
                key={page._id}
                className={`flex items-center justify-between rounded-md border p-3 ${
                  draft?._id === page._id
                    ? "border-brand bg-red-50"
                    : "border-line bg-white"
                }`}
              >
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => selectPage(page._id)}
                >
                  <div className="flex items-center gap-2 font-semibold">
                    <FileText size={15} />
                    {page.title}
                  </div>

                  <div className="text-xs text-muted">
                    /{page.slug} — {page.status}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(page._id, page.title);
                  }}
                  className="ml-3 flex h-9 w-9 items-center justify-center rounded-md border border-red-300 text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </aside>

        <section
          className={`grid gap-5 ${
            previewOpen ? "xl:grid-cols-[1fr_430px]" : ""
          }`}
        >
          <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
            {draft ? (
              <>
                <div className="mb-6 flex flex-col gap-4 border-b border-line pb-5 lg:flex-row lg:items-end lg:justify-between">
                  <div className="grid flex-1 gap-4 md:grid-cols-2">
                    <label className="block text-sm font-semibold">
                      Title
                      <input
                        value={draft.title || ""}
                        onChange={(event) =>
                          updateDraft({
                            title: event.target.value,
                          })
                        }
                        className="mt-2 w-full rounded-md border border-line px-3 py-2.5 outline-none focus:border-brand"
                      />
                    </label>

                    <label className="block text-sm font-semibold">
                      Slug
                      <input
                        value={draft.slug || ""}
                        onChange={(event) =>
                          updateDraft({
                            slug: event.target.value,
                          })
                        }
                        className="mt-2 w-full rounded-md border border-line px-3 py-2.5 outline-none focus:border-brand"
                      />
                    </label>

                    <label className="block text-sm font-semibold md:col-span-2">
                      Summary
                      <textarea
                        value={draft.summary || ""}
                        onChange={(event) =>
                          updateDraft({
                            summary: event.target.value,
                          })
                        }
                        className="mt-2 min-h-20 w-full rounded-md border border-line px-3 py-2.5 outline-none focus:border-brand"
                      />
                    </label>
                  </div>

                  <div className="flex gap-2">
                    <select
                      value={draft.status || "draft"}
                      onChange={(event) =>
                        updateDraft({
                          status: event.target.value,
                        })
                      }
                      className="rounded-md border border-line bg-white px-3 py-2.5 text-sm font-semibold"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>

                    <button
                      type="button"
                      onClick={handleSave}
                      className="inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2.5 text-sm font-semibold text-white"
                    >
                      <Save size={16} />
                      {saveStatus === "saving" ? "Saving..." : "Save"}
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                    {error}
                  </p>
                )}

                <BlockEditor
                  page={draft}
                  onChange={(blocks) =>
                    updateDraft({
                      blocks,
                    })
                  }
                />
              </>
            ) : (
              <div className="rounded-md border border-dashed border-line p-10 text-center text-muted">
                Select a page or create a new one.
              </div>
            )}
          </div>

          {previewOpen && draft ? <PreviewPanel page={draft} /> : null}
        </section>
      </section>
    </main>
  );
}
