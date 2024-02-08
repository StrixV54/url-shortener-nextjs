import mongoose, { Schema } from "mongoose";

const shortUrlSchema =
  mongoose.models?.ShortUrl ||
  new mongoose.Schema({
    full: {
      type: String,
      required: true,
    },
    short: {
      type: String,
      required: true,
    },
    clicks: {
      type: Number,
      required: true,
      default: 0,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  });

export default mongoose.models?.ShortUrl ||
  mongoose.model("ShortUrl", shortUrlSchema);
