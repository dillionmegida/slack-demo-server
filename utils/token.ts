import jwt from "jsonwebtoken";

export const secret = process.env.JWT_SECRET_KEY;

export const createToken = (obj: any) => jwt.sign({ ...obj }, secret as string);

export const isTokenValid = (token: string): any => {
  try {
    const decoded = jwt.verify(token, secret as string);
    return decoded;
  } catch {
    return false;
  }
};

export const getTokenFromCookie = (req: any) => {
  const token = req.headers.authorization;
  return token;
};
