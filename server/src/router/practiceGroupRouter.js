const express = require("express");
const { requireAuth } = require("../middleware/auth.js");
const {
  createGroup,
  joinGroup,
  getGroup,
} = require("../controller/practiceGroupController.js");

const practiceGroupRouter = express.Router();

practiceGroupRouter.post("/create", requireAuth, createGroup);
practiceGroupRouter.post("/join", requireAuth, joinGroup);
practiceGroupRouter.get("/:roomCode", requireAuth, getGroup);

module.exports = practiceGroupRouter;
