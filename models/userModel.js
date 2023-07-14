import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

// schema

const userSchema = new mongoose.Schema(
  {
    sid: {
      type: Number,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "password is require"],
      minlength: [6, "Password length should be greater than 6 character"],
      select: true,
    },
    location: {
      type: String,
      default: "India",
    },
    mobile: {
      type: Number,
      minlength: [10, "Mobile length should be 10"],
    },
    bio: {
      type: String,
    },
    profileImg: {
      type: String,
      default: "None",
    },
    coverImg: {
      type: String,
      default: "None",
    },
  },
  { timestamps: true }
);
// middlewares
userSchema.pre("save", async function () {
  if (!this.isModified) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// compare password
userSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

// JSON WEBTOKEN
userSchema.methods.createJWT = function () {
  return JWT.sign({ UserId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export default mongoose.model("Donor", userSchema);
