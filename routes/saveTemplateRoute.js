import express from "express";
import {
  createTemplate,
  getTemplates,
  deleteTemplate,
} from "../controllers/saveTemplateController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createTemplate).get("/", authMiddleware, getTemplates);
router.delete("/:id", authMiddleware, deleteTemplate);

export default router;
