import jwt from "jsonwebtoken";
import { ForbiddenError, UnauthorizedError } from "./errorHandler";

export const authenticate = (req, res, next) => {
  // Extract token from cookies
  const token = req.cookies.token;

  if (!token) {
    throw new UnauthorizedError("Authentication token is missing and unauthorized");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user info to request object
    next(); // Continue with the next middleware or route handler
  } catch (error) {
    throw new UnauthorizedError("Invalid or expired token");
  }
};

export const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    throw new ForbiddenError("Access denied: Admins only");
  }
  next();
};
