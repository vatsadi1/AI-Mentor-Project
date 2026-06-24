const express = require("express");
const { reviewCode, getReviewHistory } = require("../controller/codeReviewController.js");
const { optionalAuth, requireAuth } = require("../middleware/auth.js");

const codeReviewRouter = express.Router();

codeReviewRouter.post("/review", optionalAuth, reviewCode);
codeReviewRouter.get("/history", requireAuth, getReviewHistory);

module.exports = codeReviewRouter;
