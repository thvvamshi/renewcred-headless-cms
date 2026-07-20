import { Router } from "express";
import {
  createPage,
  deletePage,
  getAdminPage,
  getPublicPage,
  listAdminPages,
  listPublicPages,
  updatePage
} from "../controllers/content.controller.js";
import { authenticate } from "../middleware/authenticate.js";

export const contentRouter = Router();

contentRouter.get("/pages", listPublicPages);
contentRouter.get("/pages/:slug", getPublicPage);

contentRouter.use("/admin", authenticate);
contentRouter.get("/admin/pages", listAdminPages);
contentRouter.post("/admin/pages", createPage);
contentRouter.get("/admin/pages/:id", getAdminPage);
contentRouter.put("/admin/pages/:id", updatePage);
contentRouter.delete("/admin/pages/:id", deletePage);
