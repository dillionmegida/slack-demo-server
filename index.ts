import express from "express";
import { config } from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

config();

import "./database";

import UsersRouter from "routers/users.router";
import ChatRouter from "routers/chat.router";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 5000;

app.use("/api/users", UsersRouter);
app.use("/api/chat", ChatRouter);

app.get("/", (_, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`Server started on port ${port} 🚀`);
});
