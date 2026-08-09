import mongoose from "mongoose";

export interface Category {
  title: string;
  englishTitle: string;
  description: string;
  slug: string;
  icon?: string;
}

const CategorySchema = new mongoose.Schema<Category>(
  {
    title: { type: String, required: true, unique: true },
    englishTitle: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    icon: { type: String },
  },
  {
    timestamps: true,
  },
);

export const CategoryModel =
  (mongoose.models.Category as mongoose.Model<Category> | undefined) ||
  mongoose.model<Category>("Category", CategorySchema);
