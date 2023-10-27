import express from "express";
import { createChiper } from "../controllers/ED/ed";
const router = express.Router();

router.post("/cipher", createChiper);

export default router;
