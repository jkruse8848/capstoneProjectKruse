const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");
require("dotenv").config;

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const arn = process.env.AWS_ARN;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
});

// upload to s3
function uploadFiles(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
    ContentType: "image/jpeg"
  };
  return s3.upload(uploadParams).promise();
}
exports.uploadFiles = uploadFiles;

// retrieve from s3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  };
  return s3.getObject(downloadParams).createReadStream();
}

exports.getFileStream = getFileStream;
