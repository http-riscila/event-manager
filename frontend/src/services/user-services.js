import api from "./api";

async function register(userData) {
  try {
    const response = await api.post("/api/users", userData);
    return response.data;
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
  }
}

async function getById(userId) {
  try {
    const response = await api.get(`/api/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao fazer buscar ao usuário:", error);
  }
}

async function getByEmail(email) {
  try {
    const response = await api.get(`/api/users/${email}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuário por email:", error);
  }
}

async function update(userId, userData) {
  try {
    const response = await api.patch(`/api/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
  }
}

async function remove(userId) {
  try {
    const response = await api.delete(`/api/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao remover usuário:", error);
  }
}

export { register, getById, getByEmail, update, remove };
