const db = require("../database/connection.js");

module.exports = { getPlant, add, update, remove };

// get plants by id or get all plants
function getPlant(userID, plantID) {
  if (plantID) {
    return db("plants").where({ user_id: userID, plant_id: plantID });
  } else {
    return db("plants").where({ user_id: userID });
  }
}

// add plants
async function add(userID, plant) {
  const [plant_id] = await db("plants")
    .insert(plant, "plant_id")
    .returning("plant_id");
  return getPlant(userID, plant_id);
}

// edit plants
async function update(changes, plantID) {
  await db("plants").where({ plant_id: plantID }).update(changes);
  return getPlant(plantID);
}
// delete plants
async function remove(plantID) {
  const removedPlant = await getPlant(plantID);
  const removed = await db("plants").where({ plant_id: plantID }).del();
  return removed ? removedPlant : null;
}
