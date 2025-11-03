import api from "./api";

async function create(signUpData) {
  try {
    const response = await api.post("/api/sign-up", signUpData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar participante:", error);
  }
}

async function getAll() {
  try {
    const response = await api.get("/api/sign-ups");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar participantes:", error);
  }
}

async function getById(atendeeId) {
  try {
    const response = await api.get(`/api/sign-up/${atendeeId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar participante:", error);
  }
}

async function getByUserId(userId) {
  try {
    const response = await api.get(`/api/sign-ups/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar participante pelo ID do usuário:", error);
  }
}

async function getByEventId(eventId) {
  try {
    const response = await api.get(`/api/sign-ups/event/${eventId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar participante pelo ID do evento:", error);
  }
}

async function partiallyUpdate(atendeeId, signUpData) {
  try {
    const response = await api.patch(`/api/sign-up/${atendeeId}`, signUpData);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar participante:", error);
  }
}

async function remove(atendeeId, eventId) {
  try {
    const response = await api.delete(`/api/sign-up/${atendeeId}`, eventId);
    return response.data;
  } catch (error) {
    console.error("Erro ao remover participante:", error);
  }
}

export {
  create,
  getAll,
  getById,
  getByUserId,
  getByEventId,
  partiallyUpdate,
  remove,
};
