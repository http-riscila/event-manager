import prisma from "../config/prisma-client.js";

async function create(data) {
  const event = await prisma.event.create({
    data: {
      title: data.title,
      description: data.description,
      date: data.date,
      location: data.location,
      createdByUser: { connect: { id: data.userId } },
    },
    include: {
      createdByUser: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  await prisma.signUp.create({
    data: {
      userId: data.userId,
      eventId: event.id,
      type: "ADMIN",
    },
  });

  return event;
}

async function getAll() {
  return await prisma.event.findMany({
    include: {
      createdByUser: true,
    },
  });
}

async function getById(id) {
  return await prisma.event.findUnique({
    where: { id: id },
    include: {
      createdByUser: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      attendees: true,
    },
  });
}

async function update(id, data) {
  return await prisma.event.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      date: data.date,
      location: data.location,
    },
  });
}

async function partiallyUpdate(id, data) {
  const event = await prisma.event.update({
    where: { id: id },
    data: {
      title: data.title,
      description: data.description,
      date: data.date,
      location: data.location,
    },
    include: {
      createdByUser: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return event;
}

async function remove(id) {
  return await prisma.event.delete({
    where: { id: id },
  });
}

export { create, getAll, getById, update, partiallyUpdate, remove };
