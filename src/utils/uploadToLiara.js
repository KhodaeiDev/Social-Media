const { S3 } = require("@aws-sdk/client-s3");
const multer = require("multer");
const path = require("path");
const multerS3 = require("multer-s3");
require("dotenv").config();

// تنظیمات اتصال به لیارا یا S3
const s3 = new S3({
  endpoint: process.env.LIARA_ENDPOINT,
  credentials: {
    accessKeyId: process.env.LIARA_ACCESS_KEY,
    secretAccessKey: process.env.LIARA_SECRET_KEY,
  },
  region: "default",
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.LIARA_BUCKET_NAME,
    key: function (req, file, cb) {
      const extname = path.extname(file.originalname);
      const randomName = `${Date.now()}-${Math.floor(
        Math.random() * 1e9
      )}${extname}`;
      cb(null, randomName);
    },
  }),
});

module.exports = upload;
