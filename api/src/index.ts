import express, { json, urlencoded } from "express";
import productsRoutes from "./routes/products/index.js";
import ordersRoutes from "./routes/orders/index.js";
import authRoutes from "./routes/auth/index.js";

// Load environment variables early
if (process.env.NODE_ENV !== "production") {
  const dotenv = await import("dotenv");
  dotenv.config();
}

// Use Heroku's assigned port or fallback to 3000 for local development
const port = process.env.PORT || 3000;

const app = express();
app.use(urlencoded({ extended: false }));
app.use(json());

// Add a simple root route for health checks
app.get("/", (req, res) => {
  res.json({ status: "API is running" });
});

app.use("/products", productsRoutes);
app.use("/auth", authRoutes);
app.use("/orders", ordersRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
