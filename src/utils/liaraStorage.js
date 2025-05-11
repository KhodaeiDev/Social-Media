const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.LIARA_ACCESS_KEY,
  secretAccessKey: process.env.LIARA_SECRET_KEY,
  endpoint: "https://s3.ir.liara.space",
  region: "ir-thr-at1",
  signatureVersion: "v4",
});

module.exports = s3;
