import { Request, Response } from "express";
import UserModel from "models/user.model";
import { StreamChat } from "stream-chat";
import { STREAM_API_KEY, STREAM_SECRET_KEY } from "constants/keys";

const serverClient = StreamChat.getInstance(STREAM_API_KEY, STREAM_SECRET_KEY);

export default async function getStreamToken(req: Request, res: Response) {
  const { user_id } = req.params;

  try {
    const userExists = await UserModel.findOne({ _id: user_id }).select(
      "-password"
    );

    if (!userExists)
      return res.status(404).json({
        message: "Unauthorized",
      });

    const token = serverClient.createToken(user_id);

    res.json({
      token,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error! cannot get token at the moment" });
  }
}
