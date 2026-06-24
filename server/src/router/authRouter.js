const express = require("express");
const { register, login, getMe } = require("../controller/authController.js");
const { requireAuth } = require("../middleware/auth.js");

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/me", requireAuth, getMe);

module.exports = authRouter;
