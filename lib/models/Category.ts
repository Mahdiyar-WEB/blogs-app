import mongoose from "mongoose";
import type { CategoryDocument, CategoryModelType } from "types/models";

const CategorySchema = new mongoose.Schema<CategoryDocument>(
  {
    title: { type: String, required: true, uniqure: true },
    englishTitle: { type: String, required: true, uniqure: true },
    description: { type: String, required: true },
    slug: { type: String, required: true, uniqure: true },
    icon: { type: String },
  },
  {
    timestamps: true,
  },
);

export const CategoryModel: CategoryModelType =
  (mongoose.models.Category as CategoryModelType) ||
  mongoose.model<CategoryDocument>("Category", CategorySchema);
