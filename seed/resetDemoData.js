import fs from "fs/promises";
import path from "path";
import connectDB from "@/lib/db";
import { UserModel } from "@/lib/models/User";
import { PostModel } from "@/lib/models/Post";
import { CommentModel } from "@/lib/models/Comment";
import { CategoryModel } from "@/lib/models/Category";

import usersSeed from "./db.users.json";
import postsSeed from "./db.posts.json";
import commentsSeed from "./db.comments.json";
import categoriesSeed from "./db.category.json";

const RESET_STATE_FILE = path.join(process.cwd(), ".demo-reset-state.json");
const PUBLIC_UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");
const DEMO_UPLOADS_DIR = path.join(process.cwd(), "demo-assets", "uploads");

export async function removeDirectoryContents(dirPath) {
  try {
    await fs.rm(dirPath, { recursive: true, force: true });
  } catch {}
}

export async function copyDirectory(source, destination) {
  await fs.mkdir(destination, { recursive: true });
  const entries = await fs.readdir(source, { withFileTypes: true });

  for (const entry of entries) {
    const src = path.join(source, entry.name);
    const dest = path.join(destination, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(src, dest);
    } else {
      await fs.copyFile(src, dest);
    }
  }
}

export async function writeResetState(lastResetAt) {
  await fs.writeFile(
    RESET_STATE_FILE,
    JSON.stringify({ lastResetAt }, null, 2),
    "utf8",
  );
}

export async function readResetState() {
  try {
    const content = await fs.readFile(RESET_STATE_FILE, "utf8");
    return JSON.parse(content);
  } catch {
    return { lastResetAt: 0 };
  }
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

  await removeDirectoryContents(PUBLIC_UPLOADS_DIR);

  try {
    await copyDirectory(DEMO_UPLOADS_DIR, PUBLIC_UPLOADS_DIR);
  } catch {
    // اگر demo-assets/uploads موجود نبود، reset دیتابیس همچنان موفق می‌شود
  }

  const now = Date.now();
  await writeResetState(now);

  return {
    success: true,
    lastResetAt: now,
  };
}
