  import slugify from "slugify";
  import { Page } from "../models/Page.js";
  import { asyncHandler } from "../utils/asyncHandler.js";
  import { sanitizeBlocks } from "../utils/sanitizeBlocks.js";

  function pagePayload(body, userId) {
    const title = body.title?.trim() || "Untitled page";
    const slug = (body.slug || slugify(title, { lower: true, strict: true })).trim();
    const status = body.status === "published" ? "published" : "draft";

    return {
      slug,
      title,
      eyebrow: body.eyebrow || "Standards",
      summary: body.summary || "",
      category: body.category || "Standards",
      version: body.version || {},
      versions: Array.isArray(body.versions) ? body.versions : [],
      blocks: sanitizeBlocks(body.blocks),
      status,
      publishedAt: status === "published" ? body.publishedAt || new Date() : null,
      updatedBy: userId
    };
  }

  export const listPublicPages = asyncHandler(async (req, res) => {
    const pages = await Page.find({ status: "published" })
      .sort({ updatedAt: -1 })
      .select("slug title eyebrow summary category version updatedAt publishedAt");

    res.json({ success: true, pages });
  });

  export const getPublicPage = asyncHandler(async (req, res) => {
    const page = await Page.findOne({ slug: req.params.slug, status: "published" });

    if (!page) {
      const error = new Error("Published page not found");
      error.statusCode = 404;
      throw error;
    }

    res.json({ success: true, page });
  });

  export const listAdminPages = asyncHandler(async (req, res) => {
    const pages = await Page.find()
      .sort({ updatedAt: -1 })
      .select("slug title eyebrow summary category version status updatedAt publishedAt");

    res.json({ success: true, pages });
  });

  export const getAdminPage = asyncHandler(async (req, res) => {
    const page = await Page.findById(req.params.id);

    if (!page) {
      const error = new Error("Page not found");
      error.statusCode = 404;
      throw error;
    }

    res.json({ success: true, page });
  });

  export const createPage = asyncHandler(async (req, res) => {
    const page = await Page.create(pagePayload(req.body, req.user._id));

    res.status(201).json({
      success: true,
      page
    });
  });

  export const updatePage = asyncHandler(async (req, res) => {
    const payload = pagePayload(req.body, req.user._id);
    const page = await Page.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true
    });

    if (!page) {
      const error = new Error("Page not found");
      error.statusCode = 404;
      throw error;
    }

    res.json({ success: true, page });
  });

  export const deletePage = asyncHandler(async (req, res) => {
    const page = await Page.findByIdAndDelete(req.params.id);

    if (!page) {
      const error = new Error("Page not found");
      error.statusCode = 404;
      throw error;
    }

    res.json({ success: true, message: "Page deleted" });
  });
