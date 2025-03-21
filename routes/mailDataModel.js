import express from "express";
import { getEmailData } from "../controllers/mailDataController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/send-bulk-email",authMiddleware, getEmailData);

export default router;
