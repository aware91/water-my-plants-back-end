const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("../auth/auth-router.js");
const userRouter = require("../users/users-router.js");
const plantRouter = require("../plants/plants-router");

const restricted = require("../auth/restricted-middleware");
const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/user", userRouter);
server.use("/api/plants", restricted, plantRouter);

server.get("/", (req, res) => {
  res.send(`<h2>WATER MY PLANTS IS UP AND RUNNING!!!!!!!!!</h2>`);
});

module.exports = server;
