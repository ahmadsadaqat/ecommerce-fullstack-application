import express from "express";
import router from "./routes/products/index";
const port = 3000;

const app = express();

app.use(express.json());
app.use("/products", router);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
