import { config } from "dotenv";
import Express from "express";
import ImagesRouter from "./routes/images.js";

config();

const app = Express();
const PORT = process.env.PORT || 3000;

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(Express.static("public"));

app.use("/api/images", ImagesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
