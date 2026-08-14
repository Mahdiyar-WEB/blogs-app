import mongoose from "mongoose";

interface AppStateDocument {
  key: string;
  lastDemoResetAt: number;
  createdAt: Date;
  updatedAt: Date;
}

const AppStateSchema = new mongoose.Schema<AppStateDocument>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    lastDemoResetAt: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export const AppStateModel =
  (mongoose.models.AppState as mongoose.Model<AppStateDocument> | undefined) ||
  mongoose.model<AppStateDocument>("AppState", AppStateSchema);