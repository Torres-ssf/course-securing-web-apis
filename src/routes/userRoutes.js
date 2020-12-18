import { Router } from "express";

import { UserController } from "../controllers/UserController";

const userController = new UserController();

export const userRoutes = Router();

userRoutes.post("/register", userController.create);

userRoutes.post("/login", userController.login);
