import express from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  partiallyUpdateEvent,
  deleteEvent,
} from "../controllers/event-controller.js";

const eventRouter = express.Router();

eventRouter.post("/events", createEvent);
eventRouter.get("/events", getAllEvents);
eventRouter.get("/events/:id", getEventById);
eventRouter.put("/events/:id", updateEvent);
eventRouter.patch("/events/:id", partiallyUpdateEvent);
eventRouter.delete("/events/:id", deleteEvent);

export default eventRouter;
