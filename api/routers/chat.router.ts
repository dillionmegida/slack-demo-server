import express from "express";
import ConnectUser from "controllers/chat/connect-user.controller";

const ChatRouter = express.Router();

ChatRouter.post("/connect_user/:user_id", ConnectUser);

export default ChatRouter;
