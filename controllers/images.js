import { openai } from "../bootstrap/openai.js";
import fs from "fs";

export const generateImage = async (prompt, number = 1, size = "1024x1024") => {
  try {
    const response = await openai.createImage({
      prompt: prompt,
      n: number,
      size: size,
    });

    const imgURL = response.data.data[0].url;

    const imgResult = await fetch(imgURL);

    const blob = await imgResult.blob();
    const buffer = Buffer.from(await blob.arrayBuffer());

    const trimmedPrompt = trimPrompt(prompt);
    const randomString = Math.random().toString(36).substring(7);
    const today = new Date().toISOString().slice(0, 10);
    const title = `${trimmedPrompt}-${randomString}-${today}`;
    // save img to /public/assets/images/[prompt]
    const imgPath = `./public/assets/images/${title}.png`;

    fs.writeFile(imgPath, buffer, (err) => {
      if (err) {
        console.log("Error saving file", err);
      } else {
        console.log("Image saved successfully!");
      }
    });

    return {
      url: `/assets/images/${title}.png`,
      openai_url: imgURL,
    };
  } catch (err) {
    console.log("Error generating image", err);
    return false;
  }
};

const trimPrompt = (prompt) => {
  const trimmedPrompt = prompt.trim().replace(/ /g, "-").toLowerCase();
  return trimmedPrompt;
};
