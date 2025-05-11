// utils/uploadToImgbb.js
const axios = require("axios");
const fs = require("fs");
require("dotenv").config();

async function uploadToImgbb(imagePath) {
  console.log(imagePath);

  const image = fs.readFileSync(imagePath, { encoding: "base64" });

  try {
    const response = await axios.post("https://api.imgbb.com/1/upload", null, {
      params: {
        key: process.env.IMGBB_API_KEY,
        image: image,
      },
    });
    console.log("res.data->", response.data);

    return response.data.data.url;
  } catch (error) {
    console.error(
      "خطا در آپلود به imgbb:",
      error.response?.data || error.message
    );
    throw new Error("آپلود به imgbb شکست خورد");
  }
}

module.exports = uploadToImgbb;
