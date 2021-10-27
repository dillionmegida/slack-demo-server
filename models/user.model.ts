import UserInterface from "interfaces/user.interface";
import mongoose, { Schema } from "mongoose";

const UserSchema: Schema = new Schema(
  {
    _id: String,
    name: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<UserInterface>("User", UserSchema, "users");

export default UserModel;
