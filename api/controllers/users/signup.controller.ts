import { Request, Response } from "express";
import UserModel from "models/user.model";
import { nanoid } from "nanoid";
import { hashPassword } from "utils/password";
import { replaceString } from "utils/string";
import { createToken } from "utils/token";

export default async function Signup(req: Request, res: Response) {
  const { email, password, name, image } = req.body;

  try {
    const userExists = await UserModel.findOne({ email });

    if (userExists)
      return res.status(404).json({
        message: "Email has been taken already.",
      });

    const encryptedPassword = await hashPassword(password);

    const userId = nanoid(5);

    const newUser = new UserModel({
      _id: replaceString(name.toLowerCase()) + "-" + userId,
      email,
      password: encryptedPassword,
      name,
      image,
    });

    await newUser.save();

    const token = createToken({ _id: userId });

    res.json({
      message: "Account created successfully",
      user: {
        _id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        image,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: "Could not create user",
    });
  }
}
