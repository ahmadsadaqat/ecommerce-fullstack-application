import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("the list of products");
});

router.get("/:id", (req, res) => {
  res.send("single product details");
});

router.post("/", (req, res) => {
  const newProduct = req.body;
  res.send(`New product created: ${JSON.stringify(newProduct)}`);
});

export default router;
