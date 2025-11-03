import {
  create,
  getByEmail,
  getById,
  update,
  partiallyUpdate,
  deactivate,
} from "../services/user-service.js";

async function createUser(req, res) {
  try {
    const userData = req.body;
    console.log(userData);
    const newUser = await create(userData);
    console.log(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await getByEmail(email);
    if (!user || user.password !== password || !user.active) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await getById(Number(id));

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getUserByEmail(req, res) {
  try {
    const { email } = req.params;
    const user = await getByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const userData = req.body;
    console.log("chegou aqui");
    const user = await getById(Number(id));
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await update(Number(id), userData);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function partiallyUpdateUser(req, res) {
  try {
    const { id } = req.params;
    const userData = req.body;

    const user = await getById(Number(id));

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await partiallyUpdate(Number(id), userData);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deactivateUser(req, res) {
  try {
    const { id } = req.params;
    const user = await getById(Number(id));

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await deactivate(Number(id));
    res.status(200).json({ message: "User deactivated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export {
  createUser,
  loginUser,
  getUserById,
  getUserByEmail,
  updateUser,
  partiallyUpdateUser,
  deactivateUser,
};
