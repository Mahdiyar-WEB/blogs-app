import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
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

export const CategoryModel =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);
