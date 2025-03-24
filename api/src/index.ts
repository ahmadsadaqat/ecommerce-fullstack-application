import express, { json, urlencoded } from "express";
import router from "./routes/products/index";
const port = 3000;

const app = express();
app.use(urlencoded({ extended: false }));
app.use(json());

app.use("/products", router);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
