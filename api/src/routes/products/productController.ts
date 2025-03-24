import { Request, Response } from "express";

export function createProduct(req: Request, res: Response) {
  const newProduct = req.body;
  console.log(newProduct);
  res.send(`New product created: ${JSON.stringify(newProduct)}`);
}

export function getProductById(req: Request, res: Response) {
  const productId = req.params.id;
  res.send(`single product details for product ID: ${productId}`);
}

export function getProducts(req: Request, res: Response) {
  res.send("the list of products");
}

export function updateProduct(req: Request, res: Response) {
  const productId = req.params.id;
  const updatedProduct = req.body;
  res.send(
    `Product with ID ${productId} has been updated: ${JSON.stringify(
      updatedProduct,
    )}`,
  );
}

export function deleteProduct(req: Request, res: Response) {
  const productId = req.params.id;
  res.send(`Product with ID ${productId} has been deleted`);
}
