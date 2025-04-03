import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "./productController.js";
import { validateData } from "../../middleware/validationMiddleware.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../../db/productsSchema.js";
import { verifySeller, verifyToken } from "../../middleware/authMiddleware.js";

const router = express.Router();

// router.get("/", async (req, res) => {
//   try {
//     res.json({ message: "Products route working!" });
//   } catch (error) {
//     if (error instanceof Error) {
//       res.status(500).json({ error: error.message });
//     } else {
//       res.status(500).json({ error: "An unknown error occurred" });
//     }
//   }
// });

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
