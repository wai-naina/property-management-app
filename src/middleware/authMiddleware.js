const jwt = require("jsonwebtoken");

const authMiddleware = (roles) => (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the user's role is allowed
    if (!roles.includes(decoded.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Attach the user to the request object
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;