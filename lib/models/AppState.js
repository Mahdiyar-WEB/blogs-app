import mongoose from "mongoose";

const AppStateSchema = new mongoose.Schema(
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
  mongoose.models.AppState || mongoose.model("AppState", AppStateSchema);
