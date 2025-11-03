import express from "express";
import {
  createUser,
  loginUser,
  getUserById,
  getUserByEmail,
  updateUser,
  partiallyUpdateUser,
  deactivateUser,
} from "../controllers/user-controller.js";

const userRouter = express.Router();

userRouter.post("/users", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/users/:id", getUserById);
userRouter.get("/users/email/:email", getUserByEmail);
userRouter.put("/users/:id", updateUser);
userRouter.patch("/users/:id", partiallyUpdateUser);
userRouter.delete("/users/:id", deactivateUser);

export default userRouter;
