const db = require("../database/connection.js");

module.exports = {
  add,
  findBy,
  findById,
  isSignUpValid,
  isSignInValid,
  updateUser,
};

async function add(user) {
  try {
    const [id] = await db("users").insert(user, "id").returning("id");

    return findById(id);
  } catch (error) {
    throw error;
  }
}

function findBy(filter) {
  return db("users").where(filter).orderBy("id");
}

function findById(id) {
  return db("users").where({ id }).first();
}

async function updateUser(changes, userID) {
  await db("users").where({ id: userID }).update(changes);
  return findById(userID);
}

function isSignUpValid(user) {
  return Boolean(
    user.username &&
      user.phone &&
      user.password &&
      typeof user.password === "string"
  );
}

function isSignInValid(user) {
  return Boolean(
    user.username && user.password && typeof user.password === "string"
  );
}
