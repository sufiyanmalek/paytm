import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import crypto from "crypto";

const client = new S3Client({
  region: process.env.region,
  credentials: {
    accessKeyId: process.env.aws_access_key_id,
    secretAccessKey: process.env.aws_secret_access_key,
  },
});

export const putObject = async (data) => {
  const objectName = crypto.randomUUID();
  const command = new PutObjectCommand({
    Bucket: process.env.aws_bucket,
    Key: objectName,
    Body: data,
  });

  try {
    const response = await client.send(command);
    const url = new URL(
      `https://${process.env.aws_bucket}.s3.ap-south-1.amazonaws.com/${objectName}`
    );
    return url.href;
  } catch (err) {
    console.error(err);
  }
};
