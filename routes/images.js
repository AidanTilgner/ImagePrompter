import { Router } from "express";
import { generateImage } from "../controllers/images.js";

const router = Router();

router.post("/", async (req, res) => {
  const { prompt, number, size } = req.body;

  const newImage = await generateImage(prompt, number, size);

  if (!newImage) {
    return res
      .status(500)
      .json({ message: "Error generating image", status: 500 });
  }

  const { url, openai_url } = newImage;

  res.send({
    message: "Image generated successfully!",
    url: url,
    openai_url: openai_url,
    status: 200,
  });
});

export default router;
