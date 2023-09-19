require('dotenv').config({ path: "./.env" });

const AWS = require("aws-sdk");
const multer = require("multer");
const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  credentials: {
    secretAccessKey: process.env.S3_SECRET,
    accessKeyId: process.env.S3_KEY,
  }
});
const NAME_OF_BUCKET = "fifth-fleet-photos"; // <-- Use your bucket name here

// the multer package reads and parses retrieved files
const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
      callback(null, "");
    },
});

const singleMulterUpload = (nameOfKey) =>
    multer({ storage: storage }).single(nameOfKey);

const multipleMulterUpload = (nameOfKey) =>
    multer({ storage: storage }).array(nameOfKey);

// Uploada single file
const singleFileUpload = async ({ file, public = false }) => {
    const { originalname, buffer } = file;
    const path = require("path");

    // Set the name of the file in your S3 bucket to the date in ms plus the
    // extension name.
    const Key = new Date().getTime().toString() + path.extname(originalname);
    const uploadParams = {
      Bucket: NAME_OF_BUCKET,
      Key: public ? `public/${Key}` : Key,
      Body: buffer
    };
    const result = await s3.upload(uploadParams).promise();

    // Return the link if public. If private, return the name of the file in your
    // S3 bucket as the key in your database for subsequent retrieval.
    return public ? result.Location : result.Key;
};

// upload multiple files
const multipleFilesUpload = async ({files, public = false}) => {
    return await Promise.all(
      files.map((file) => {
        return singleFileUpload({file, public});
      })
    );
};

// grab a private file
const retrievePrivateFile = (key) => {
    let fileUrl;
    if (key) {
      fileUrl = s3.getSignedUrl("getObject", {
        Bucket: NAME_OF_BUCKET,
        Key: key
      });
    }
    return fileUrl || key;
};


module.exports = {
  s3,
  singleFileUpload,
  multipleFilesUpload,
  retrievePrivateFile,
  singleMulterUpload,
  multipleMulterUpload
}
