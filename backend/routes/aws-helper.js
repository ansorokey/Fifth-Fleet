// boto3 for python
// import boto3
// import botocore
// import os

// s3 = boto3.client(
//    "s3",
//    aws_access_key_id=os.environ.get("S3_KEY"),
//    aws_secret_access_key=os.environ.get("S3_SECRET")
// )

// // Load the AWS SDK for Node.js
// var AWS = require('aws-sdk');
// // Set the region
// AWS.config.update({region: 'US East (Ohio) us-east-2'});

// // Create S3 service object
// var s3 = new AWS.S3({apiVersion: '2006-03-01'});

// // call S3 to retrieve upload file to specified bucket
// var uploadParams = {Bucket: process.argv[2], Key: '', Body: ''};
// var file = process.argv[3];

// // Configure the file stream and obtain the upload parameters
// var fs = require('fs');
// var fileStream = fs.createReadStream(file);
// fileStream.on('error', function(err) {
//   console.log('File Error', err);
// });
// uploadParams.Body = fileStream;
// var path = require('path');
// uploadParams.Key = path.basename(file);

// // call S3 to retrieve upload file to specified bucket
// s3.upload (uploadParams, function (err, data) {
//   if (err) {
//     console.log("Error", err);
//   } if (data) {
//     console.log("Upload Success", data.Location);
//   }
// });

// var s3 = new AWS.S3({
//   apiVersion: "2006-03-01",
//   params: { Bucket: albumBucketName }
// });


// const AWS = require('aws-sdk');
// require("aws-sdk/lib/maintenance_mode_message").suppress = true;
// import entire SDK
// const AWS = require('aws-sdk');
// import AWS object without services
// const AWS = require('aws-sdk/global');
// import individual service
// const S3Client = require('aws-sdk/client-s3');
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"; // ES Modules import
require('dotenv').config({ path: "../.env" });
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3"); // CommonJS import

async function tryThis() {
    console.log(process.env.AWS_REGION);
    console.log(process.env.S3_SECRET);
    console.log(process.env.S3_KEY);
    const client = new S3Client({
        bucketEndpoint: process.env.S3_BUCKET,
        region: process.env.AWS_REGION,
        credentials: {
            secretAccessKey: process.env.S3_SECRET,
            accessKeyId: process.env.S3_KEY,
        }
    });
    const input = {
        Body: 'Hello World',
        Bucket: 'fifth-fleet-photos',
        Key: 'my-file.txt'
    }
    const command = new PutObjectCommand(input);
    const response = await client.send(command);
}

tryThis();

// console.log(S3);

// const s3 = new AWS.S3();

// async function awsUpload() {
//     await S3Client.PutObjectCommand({
//         Body: 'Hello World',
//         Bucket: 'fifth-fleet-photos',
//         Key: 'my-file.txt'
//     });

// }

// awsUpload();
