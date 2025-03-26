import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "./productController";
import { validateData } from "../../middleware/validationMiddleware";
import {
  createProductSchema,
  updateProductSchema,
} from "../../db/productsSchema";
import { verifySeller, verifyToken } from "../../middleware/authMiddleware";

const router = Router();

// Public routes - no authentication required
router.get("/", getProducts);
router.get("/:id", getProductById);

// Protected routes - authentication required
router.post(
  "/",
  verifyToken,
  verifySeller,
  validateData(createProductSchema),
  createProduct,
);
router.put(
  "/:id",
  verifyToken,
  verifySeller,
  validateData(updateProductSchema),
  updateProduct,
);
router.delete("/:id", verifyToken, verifySeller, deleteProduct);

export default router;
