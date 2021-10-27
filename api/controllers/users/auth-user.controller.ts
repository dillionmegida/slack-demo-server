import { Request, Response } from "express";
import UserModel from "models/user.model";
import { getTokenFromCookie, isTokenValid } from "utils/token";

export default async function AuthUser(req: Request, res: Response) {
  const token = getTokenFromCookie(req);

  const tokenString = token ? token.split(" ")[1] : undefined;

  if (!token || !tokenString)
    return res.status(401).json({ message: "Not logged in" });

  const decoded: { _id: string } = isTokenValid(tokenString);
  if (!decoded) return res.status(401).json({ message: "Not logged in" });

  try {
    const authUser = await UserModel.findOne({
      _id: decoded._id,
    }).select("-password");

    if (!authUser)
      return res.status(404).json({
        message: "Not authorized",
      });

    res.json({
      user: authUser,
    });
  } catch {
    res.status(500).json({ message: "Not authorized" });
  }
}
