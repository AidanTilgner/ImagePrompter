import { Router } from "express";
import { generateImage } from "../controllers/images.js";

const router = Router();

router.post("/", async (req, res) => {
  const { prompt, number, size } = req.body;

  const { url, openai_url } = await generateImage(prompt, number, size);

  res.send({
    message: "Image generated successfully!",
    url: url,
    openai_url: openai_url,
  });
});

export default router;
