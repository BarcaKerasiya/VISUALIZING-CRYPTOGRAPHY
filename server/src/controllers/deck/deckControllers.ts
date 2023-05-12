import Deck from "../../models/Deck";
import { Request, Response } from "express";

export const deleteDeckController = async (req: Request, res: Response) => {
  const deckId = req.params.deckId;
  const deletedDeck = await Deck.findByIdAndDelete(deckId);
  res.json(deletedDeck);
};

export const getDecksController = async (req: Request, res: Response) => {
  const decks = await Deck.find();
  console.log(decks);
  res.json(decks);
};

export const createDeckController = async (req: Request, res: Response) => {
  const newDeck = new Deck({
    title: req.body.title,
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
};
