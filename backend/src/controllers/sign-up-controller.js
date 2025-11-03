import {
  create,
  getAll,
  getById,
  getByUserId,
  getByEventId,
  update,
  remove,
} from "../services/sign-up-service.js";

async function createSignUp(req, res) {
  try {
    const { userId, eventId } = req.body;
    const newSignUp = await create({ userId, eventId });
    res.status(201).json(newSignUp);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getAllSignUps(req, res) {
  try {
    const signUps = await getAll();
    res.status(200).json(signUps);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getSignUpById(req, res) {
  try {
    const { id } = req.params;
    const signUp = await getById(Number(id));

    if (!signUp) {
      return res.status(404).json({ message: "sign up not found" });
    }

    res.status(200).json(signUp);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getSignUpsByUserId(req, res) {
  try {
    const { userId } = req.params;
    const signUps = await getByUserId(Number(userId));

    if (!signUps || signUps.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(signUps);
  } catch (error) {
    console.error("Erro ao buscar inscrições:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getSignUpByEventId(req, res) {
  try {
    const { eventId } = req.params;
    const signUps = await getByEventId(Number(eventId));
    if (!signUps || signUps.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(signUps);
  } catch (error) {
    console.error("Erro ao buscar inscrições pelo ID do evento:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateSignUp(req, res) {
  try {
    const { id } = req.params;
    const signUpData = req.body;

    const signUp = await getById(Number(id));

    if (!signUp) {
      return res.status(404).json({ message: "sign up not found" });
    }

    const updatedSignUp = await update(Number(id), signUpData.type);
    res.status(200).json(updatedSignUp);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteSignUp(req, res) {
  try {
    const { id } = req.params;

    const signUp = await getById(Number(id));

    if (!signUp) {
      return res.status(404).json({ message: "sign up not found" });
    }

    await remove(Number(id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export {
  createSignUp,
  getAllSignUps,
  getSignUpById,
  getSignUpsByUserId,
  getSignUpByEventId,
  updateSignUp,
  deleteSignUp,
};
