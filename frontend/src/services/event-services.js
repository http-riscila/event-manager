import api from "./api";

async function create(eventData) {
  try {
    const response = await api.post("/api/events", eventData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar evento:", error);
  }
}

async function getAll() {
  try {
    const response = await api.get("/api/events");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar eventos:", error);
  }
}

async function getById(userId) {
  try {
    const response = await api.get(`/api/events/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar evento:", error);
  }
}

async function update(eventId, eventData) {
  try {
    const response = await api.patch(`/api/events/${eventId}`, eventData);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar evento:", error);
  }
}

async function remove(eventId) {
  try {
    const response = await api.delete(`/api/events/${eventId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao remover evento:", error);
  }
}

export { create, getAll, getById, update, remove };
