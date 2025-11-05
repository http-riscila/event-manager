import prisma from "../config/prisma-client.js";

async function create({ userId, eventId }) {
  return await prisma.signUp.create({
    data: {
      type: "ATTENDEE",
      user: { connect: { id: userId } },
      event: { connect: { id: eventId } },
    },
  });
}

async function getAll() {
  return await prisma.signUp.findMany();
}

async function getById(id) {
  return await prisma.signUp.findUnique({
    where: { id: id },
  });
}

async function getByUserId(userId) {
  return await prisma.signUp.findMany({
    where: { userId: userId },
  });
}

async function getByEventId(eventId) {
  return await prisma.signUp.findMany({
    where: { eventId: eventId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      event: {
        select: {
          id: true,
          title: true,
          date: true,
        },
      },
    },
  });
}

async function update(id, type) {
  return await prisma.signUp.update({
    where: { id },
    data: { type },
  });
}

async function remove(id) {
  return await prisma.signUp.delete({
    where: { id: id },
  });
}

export { create, getAll, getById, getByUserId, getByEventId, update, remove };
