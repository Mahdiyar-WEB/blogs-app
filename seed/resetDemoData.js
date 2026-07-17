import fs from "fs/promises";
import path from "path";
import {
  DeleteObjectsCommand,
  ListObjectsV2Command,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

import connectDB from "lib/db";
import { s3 } from "lib/s3";
import { UserModel } from "lib/models/User";
import { PostModel } from "lib/models/Post";
import { CommentModel } from "lib/models/Comment";
import { CategoryModel } from "lib/models/Category";
import { AppStateModel } from "lib/models/AppState";

import usersSeed from "./db.users.json";
import postsSeed from "./db.posts.json";
import commentsSeed from "./db.comments.json";
import categoriesSeed from "./db.category.json";

const DEMO_UPLOADS_DIR = path.join(process.cwd(), "demo-assets", "uploads");
const STORAGE_UPLOADS_PREFIX = "uploads";
const DEMO_RESET_STATE_KEY = "demo-reset-state";

function getBucketName() {
  const bucket = process.env.LIARA_BUCKET_NAME;

  if (!bucket) {
    throw new Error("LIARA_BUCKET_NAME is not set");
  }

  return bucket;
}

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  switch (ext) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".webp":
      return "image/webp";
    case ".gif":
      return "image/gif";
    case ".svg":
      return "image/svg+xml";
    case ".avif":
      return "image/avif";
    default:
      return "application/octet-stream";
  }
}

async function listLocalFiles(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await listLocalFiles(fullPath)));
      continue;
    }

    files.push(fullPath);
  }

  return files;
}

async function deleteStoragePrefix(prefix) {
  const bucket = getBucketName();
  let continuationToken;

  do {
    const listResult = await s3.send(
      new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: prefix,
        ContinuationToken: continuationToken,
      }),
    );

    const objects =
      listResult.Contents?.flatMap((item) =>
        item.Key ? [{ Key: item.Key }] : [],
      ) ?? [];

    if (objects.length > 0) {
      await s3.send(
        new DeleteObjectsCommand({
          Bucket: bucket,
          Delete: {
            Objects: objects,
            Quiet: true,
          },
        }),
      );
    }

    continuationToken = listResult.IsTruncated
      ? listResult.NextContinuationToken
      : undefined;
  } while (continuationToken);
}

async function uploadDemoAssetsToStorage() {
  const bucket = getBucketName();
  const files = await listLocalFiles(DEMO_UPLOADS_DIR);

  await Promise.all(
    files.map(async (filePath) => {
      const body = await fs.readFile(filePath);
      const relativePath = path
        .relative(DEMO_UPLOADS_DIR, filePath)
        .split(path.sep)
        .join("/");

      const key = `${STORAGE_UPLOADS_PREFIX}/${relativePath}`;

      await s3.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: body,
          ContentType: getContentType(filePath),
        }),
      );
    }),
  );
}

async function resetDemoStorageAssets() {
  await deleteStoragePrefix(`${STORAGE_UPLOADS_PREFIX}/`);

  try {
    await uploadDemoAssetsToStorage();
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
    // اگر demo-assets/uploads موجود نبود، reset دیتابیس همچنان موفق می‌شود
  }
}

export async function writeResetState(lastResetAt) {
  await connectDB();

  await AppStateModel.updateOne(
    { key: DEMO_RESET_STATE_KEY },
    {
      $set: {
        key: DEMO_RESET_STATE_KEY,
        lastDemoResetAt: lastResetAt,
      },
    },
    { upsert: true },
  );
}

export async function readResetState() {
  await connectDB();

  const state = await AppStateModel.findOne(
    { key: DEMO_RESET_STATE_KEY },
    { lastDemoResetAt: 1, _id: 0 },
  ).lean();

  return {
    lastResetAt: state?.lastDemoResetAt ?? 0,
  };
}

export async function resetDemoData() {
  await connectDB();

  await Promise.all([
    UserModel.deleteMany({}),
    PostModel.deleteMany({}),
    CommentModel.deleteMany({}),
    CategoryModel.deleteMany({}),
  ]);

  await UserModel.insertMany(usersSeed, { ordered: true });
  await CategoryModel.insertMany(categoriesSeed, { ordered: true });
  await PostModel.insertMany(postsSeed, { ordered: true });
  await CommentModel.insertMany(commentsSeed, { ordered: true });

  await resetDemoStorageAssets();

  const now = Date.now();
  await writeResetState(now);

  return {
    success: true,
    lastResetAt: now,
  };
}
