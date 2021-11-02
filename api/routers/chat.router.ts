import express from "express";
import getStreamToken from "controllers/chat/token.controller";

const ChatRouter = express.Router();

ChatRouter.post("/token/:user_id", getStreamToken);

export default ChatRouter;
