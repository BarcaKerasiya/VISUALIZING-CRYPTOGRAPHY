import { config } from "dotenv";
config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/index";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/", router);

mongoose.connect(process.env.MONGO_URL!).then(() => {
  app.listen(PORT);
  console.log(`Port listeing on ${PORT}`);
});
