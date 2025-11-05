import {
  create,
  getAll,
  getById,
  update,
  partiallyUpdate,
  remove,
} from "../services/event-service.js";

async function createEvent(req, res) {
  try {
    const eventData = req.body;
    const newEvent = await create(eventData);

    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
}

async function getAllEvents(req, res) {
  try {
    const events = await getAll();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getEventById(req, res) {
  try {
    const { id } = req.params;
    const event = await getById(Number(id));

    if (!event) {
      return res.status(404).json({ message: "event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateEvent(req, res) {
  try {
    const { id } = req.params;
    const eventData = req.body;

    const event = await getById(Number(id));

    if (!event) {
      return res.status(404).json({ message: "event not found" });
    }

    const updatedEvent = await update(Number(id), eventData);
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function partiallyUpdateEvent(req, res) {
  try {
    const { id } = req.params;
    const eventData = req.body;

    const updatedEvent = await partiallyUpdate(Number(id), eventData);

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
}

async function deleteEvent(req, res) {
  try {
    const { id } = req.params;

    const event = await getById(Number(id));

    if (!event) {
      return res.status(404).json({ message: "event not found" });
    }

    await remove(Number(id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  partiallyUpdateEvent,
  deleteEvent,
};
