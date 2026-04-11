import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers?.authorization;

  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1]; // "Bearer token"

  if (!token) return res.status(401).json({ error: "Malformed token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("DECODED USER:", decoded);
    req.user = decoded; // attach user to request
    next();
  } catch (err) {
    console.error("JWT VERIFY ERROR:", err.message);
    res.status(403).json({ error: "Invalid or expired token" });
  }
};
