import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    res.status(401).json({ error: "Access denied" });
    return;
  }

  try {
    // Extract token from Bearer format
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.substring(7) // Remove 'Bearer ' prefix
      : authHeader;

    // Use environment variable instead of hardcoded secret
    const jwtSecret = process.env.JWT_SECRET || "your-secret";

    // decode jwt token data
    const decoded = jwt.verify(token, jwtSecret);
    if (typeof decoded !== "object" || !decoded?.userId) {
      res.status(401).json({ error: "Access denied" });
      return;
    }
    req.userId = decoded.userId;
    req.role = decoded.role;

    next();
  } catch (e) {
    res.status(401).json({ error: "Access denied" });
  }
}

export function verifySeller(req: Request, res: Response, next: NextFunction) {
  const role = req.role;

  if (role !== "seller") {
    res.status(401).json({ error: "Access denied" });
    return;
  }
  next();
}
