import mongoose from "mongoose";

export interface AppState {
  key: string;
  lastDemoResetAt: number;
}

const AppStateSchema = new mongoose.Schema<AppState>(
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
  (mongoose.models.AppState as mongoose.Model<AppState> | undefined) ||
  mongoose.model<AppState>("AppState", AppStateSchema);
