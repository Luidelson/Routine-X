const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.Status(401).json({ error: "No token provided" });
  const token = auth.split(" ")[1];
  try {
    const payLoad = jwt.verify(token, "SECRET_KEY");
    req.user = payLoad;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = authMiddleware;
