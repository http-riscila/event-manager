import prisma from "../config/prisma-client.js";

async function create(data) {
  return await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
  });
}

async function getByEmail(email) {
  return await prisma.user.findUnique({
    where: { email: email },
  });
}

async function getById(id) {
  return await prisma.user.findUnique({
    where: { id: id },
  });
}

async function update(id, data) {
  return await prisma.user.update({
    where: { id },
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
  });
}

async function partiallyUpdate(id, data) {
  return await prisma.user.update({
    where: { id },
    data: {
      ...data,
    },
  });
}

async function deactivate(id) {
  return await prisma.user.update({
    where: { id: id },
    data: { active: false },
  });
}

export { create, getByEmail, getById, update, partiallyUpdate, deactivate };
