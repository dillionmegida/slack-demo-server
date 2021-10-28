import { Request, Response } from "express";
import UserModel from "models/user.model";
import { doesPasswordMatch } from "utils/password";
import { createToken } from "utils/token";

export default async function Login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const userExists = await UserModel.findOne({ email });

    if (!userExists)
      return res.status(404).json({
        message: "Wrong email/password",
      });

    const passwordMatches = await doesPasswordMatch(
      password,
      userExists.password
    );

    if (!passwordMatches)
      return res.status(404).json({
        message: "Wrong email/password",
      });

    const token = createToken({ _id: userExists._id });

    res.json({
      message: "Logged in",
      user: {
        _id: userExists._id,
        email: userExists.email,
        name: userExists.name,
        image: userExists.image,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Error! cannot login at the moment" });
  }
}
