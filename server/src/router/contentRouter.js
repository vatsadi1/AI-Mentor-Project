const express = require("express");
const { generateDraft } = require("../controller/contentController");

const contentRouter = express.Router();

contentRouter.post("/generate", generateDraft);

module.exports = contentRouter;
