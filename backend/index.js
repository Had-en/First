import express from "express";
import { validate, check, response, start } from "./controller.js";
import cors from "cors";
import mongoose from "mongoose";

const app = new express();
app.use(cors());
app.use(express.json());
const PORT = 3000;
const DB =
  "mongodb+srv://memystery111:dZ2ZcDKdBwuQA4r9@cluster0.mj3seyk.mongodb.net/Main?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(DB).then((con) => {});

app.get("/api/you", start);
app.post("/api/you", validate, check);
app.post("/api/me", response);
app.listen(PORT, () => {});
