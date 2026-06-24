const express = require("express");
const { startSession, evaluateAnswer } = require("../controller/interviewController");

const interviewRouter = express.Router();

interviewRouter.post("/session", startSession);
interviewRouter.post("/evaluate", evaluateAnswer);

module.exports = interviewRouter;
