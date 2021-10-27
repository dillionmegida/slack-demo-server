import Signup from "controllers/users/signup.controller";
import Login from "controllers/users/login.controller";
import express from "express";
import AuthUser from "controllers/users/auth-user.controller";

const UsersRouter = express.Router();

UsersRouter.post("/", Signup);

UsersRouter.post("/login", Login);

UsersRouter.get("/me", AuthUser);

export default UsersRouter;
