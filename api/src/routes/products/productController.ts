import { Request, Response } from "express";
import { db } from "../../db/index.js";
import { productsTable } from "../../db/productsSchema.js";
import { eq } from "drizzle-orm";
import _ from "lodash";

export async function createProduct(req: Request, res: Response) {
  try {
    console.log(req.userId);
    const product = await db
      .insert(productsTable)
      .values(req.cleanBody)
      .returning();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, Number(id)));

    if (!product) {
      res.status(404).json({ message: "Product not found" });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function getProducts(req: Request, res: Response) {
  try {
    const products = await db.select().from(productsTable);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const productId = req.params.id;
    const updatedProduct = req.cleanBody;
    const [product] = await db
      .update(productsTable)
      .set(updatedProduct)
      .where(eq(productsTable.id, Number(productId)))
      .returning();

    if (!product) {
      res.status(404).json({ message: "Product not found" });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const [deletedProduct] = await db
      .delete(productsTable)
      .where(eq(productsTable.id, Number(id)))
      .returning();
    if (!deletedProduct) {
      res.status(404).json({ message: "Product not found" });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    res.status(500).json(error);
  }
}
