import jwt from "jsonwebtoken";

const authenticateUser = async (req, res, next) => {
  // Extract token from Authorization header
  const token = req.headers["authorization"]?.split(" ")[1];  // "Bearer <token>"

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "no token found" });
  }

  // Verify the token
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "invalid token" });
    }

    // Attach the user info to the request object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  });
};

export default authenticateUser;
