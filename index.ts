import express from "express";
import { config } from "dotenv";
import cors from "cors";

config();

const app = express();
app.use(cors());

const port = process.env.PORT || 5000;

app.get("/", (_, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`Server started on port ${port} 🚀`);
});
