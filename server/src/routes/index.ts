import express from "express";
import {
  createDeckController,
  deleteDeckController,
  getDecksController,
} from "../controllers/deck/deckControllers";
const router = express.Router();

router.delete("/decks/:deckId", deleteDeckController);
router.get("/decks", getDecksController);
router.post("/decks", createDeckController);
export default router;
