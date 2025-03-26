import express, { json, urlencoded } from "express";
import productRoutes from "./routes/products/index.js";
import authRoutes from "./routes/auth/index.js";

const port = 3000;

const app = express();
app.use(urlencoded({ extended: false }));
app.use(json());

app.use("/products", productRoutes);
app.use("/auth", authRoutes);
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
