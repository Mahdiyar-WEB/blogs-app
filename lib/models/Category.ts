import mongoose from "mongoose";

interface CategoryDocument {
  title: string;
  englishTitle: string;
  description: string;
  slug: string;
  icon?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new mongoose.Schema<CategoryDocument>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },

    englishTitle: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    icon: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const CategoryModel =
  (mongoose.models.Category as mongoose.Model<CategoryDocument> | undefined) ||
  mongoose.model<CategoryDocument>("Category", CategorySchema);