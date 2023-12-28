const jwt = require("jsonwebtoken");

const adminAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    // Validate if token is provided
    if (!token) {
      return res.status(400).json({ error: "Token is required" });
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, "your_secret_key");
      req.admin = decoded.user; // Attach the admin user to the request object
      next();
    } catch (error) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
  } catch (error) {
    console.error("Admin authentication error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = adminAuthMiddleware;
