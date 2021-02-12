const express = require("express");

const Plants = require("./plants-model");

const router = express.Router();

router.get("/", (req, res) => {
  res
    .status(200)
    .send("<h3>Visit /:userID to see all of the user's plants</h3>");
});

// get all plants a user has
router.get("/:userID", async (req, res) => {
  const userID = req.params.userID;
  try {
    const plants = await Plants.getPlant(userID);
    if (plants) {
      res.status(200).json(plants);
    } else {
      res
        .status(404)
        .json({ error: "Could not find plants with the given user id" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Plants could not be retrieved" });
  }
});

// get a specific plant
router.get("/:userID/:plantID", async (req, res) => {
  const userID = req.params.userID;
  const plantID = req.params.plantID;
  try {
    const plant = await Plants.getPlant(userID, plantID);
    if (plant) {
      res.status(200).json(plant);
    } else {
      res.status(404).json({
        error: "Could not find the plant with the given user and plant id",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Plant could not be retrieved" });
  }
});

// add a plant
router.post("/:userID/", async (req, res) => {
  const userID = req.params.userID;
  const plantData = { ...req.body, user_id: userID };
  console.log(plantData);
  try {
    const plant = await Plants.add(userID, plantData);
    res.status(201).json(plant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server was not able to add this plant" });
  }
});
module.exports = router;

// update a plant
router.put("/:userID/:plantID", async (req, res) => {
  const userID = req.params.userID;
  const plantID = req.params.plantID;
  try {
    const plant = await Plants.update(req.body, plantID);
    if (plant) {
      res.status(200).json(plant);
    } else {
      res
        .status(404)
        .json({ error: "server could not find any plant with that plant id" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server could not update the plant" });
  }
});

router.delete("/:userID/:plantID", async (req, res) => {
  const userID = req.params.userID;
  const plantID = req.params.plantID;
  try {
    const deleted = await Plants.remove(userID, plantID);
    if (deleted) {
      res.status(204).json({ message: `Sucessfully deleted ${deleted}` });
    } else {
      res.status(404).json({ error: "No plant found with that id" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server could not delete the plant" });
  }
});
