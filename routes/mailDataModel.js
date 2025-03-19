import express from "express";
import { getEmailData } from "../controllers/mailDataController.js";

const router = express.Router();

router.post("/send-bulk-email", getEmailData);

export default router;
