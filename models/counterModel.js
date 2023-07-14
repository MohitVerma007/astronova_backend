import mongoose from "mongoose";

// Counter table
const counterSchema = {
  id: {
    type: String,
  },
  seq: {
    type: Number,
  },
};

export default mongoose.model("counter", counterSchema);
