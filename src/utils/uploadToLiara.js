const fs = require("fs");
const path = require("path");
const s3 = require("./liaraStorage");
const fs = require("fs");

exports.uploadToLiara = (filePath, fileName) => {
  const fileContent = fs.readFileSync(filePath);

  const extname = path.extname(fileName).toLowerCase();
  let contentType;

  if (extname === ".jpg" || extname === ".jpeg") {
    contentType = "image/jpeg";
  } else if (extname === ".png") {
    contentType = "image/png";
  } else if (extname === ".webp") {
    contentType = "image/webp";
  } else {
    throw new Error({ message: "file type not allowed" });
  }

  const params = {
    Bucket: "khodaeidev",
    Key: fileName, // نام فایل در لیارا
    Body: fileContent,
    ACL: "public-read", // اگر باکت عمومی‌ـه
    ContentType: contentType, // قرار دادن نوع MIME مناسب
  };

  return s3.upload(params).promise();
};
