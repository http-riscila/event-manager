import express from "express";
import {
  createSignUp,
  getAllSignUps,
  getSignUpById,
  getSignUpsByUserId,
  getSignUpByEventId,
  updateSignUp,
  deleteSignUp,
} from "../controllers/sign-up-controller.js";

const signUpRouter = express.Router();

signUpRouter.post("/sign-up", createSignUp);
signUpRouter.get("/sign-ups", getAllSignUps);
signUpRouter.get("/sign-up/:id", getSignUpById);
signUpRouter.get("/sign-ups/user/:userId", getSignUpsByUserId);
signUpRouter.get("/sign-ups/event/:eventId", getSignUpByEventId);
signUpRouter.put("/sign-up/:id", updateSignUp);
signUpRouter.delete("/sign-up/:id", deleteSignUp);

export default signUpRouter;
