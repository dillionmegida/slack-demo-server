import mongoose from "mongoose";

const uri = process.env.MONGODB_URI as string;

mongoose
  .connect(uri)
  .then(() => console.log("Database Connected Successfully 👍"))
  .catch((err: any) => console.log(err));
