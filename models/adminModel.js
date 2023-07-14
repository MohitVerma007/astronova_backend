import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  level: {
    type: String,
    enum: ["Admin", "Super Admin"],
    default: "Super Admin",
  },
});

export default mongoose.model("Admin", adminSchema);
