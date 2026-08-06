import { S3Client } from "@aws-sdk/client-s3";

const endpoint = process.env.LIARA_ENDPOINT;
const accessKeyId = process.env.LIARA_ACCESS_KEY;
const secretAccessKey = process.env.LIARA_SECRET_KEY;

if (!endpoint || !accessKeyId || !secretAccessKey) {
  throw new Error("Liara object storage env vars are missing");
}

export const s3 = new S3Client({
  region: "default",
  endpoint,
  forcePathStyle: true,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});
