const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model.js");

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }
  return secret;
}

function signToken(userId) {
  return jwt.sign({ sub: userId }, getJwtSecret(), { expiresIn: "7d" });
}

async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const token = header.slice(7);
    const payload = jwt.verify(token, getJwtSecret());
    const user = await userModel.findById(payload.sub).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

async function optionalAuth(req, _res, next) {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      return next();
    }

    const token = header.slice(7);
    const payload = jwt.verify(token, getJwtSecret());
    const user = await userModel.findById(payload.sub).select("-password");
    if (user) req.user = user;
  } catch {
    // Ignore invalid tokens for optional auth
  }
  next();
}

module.exports = { signToken, requireAuth, optionalAuth };
