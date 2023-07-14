import mongoose from "mongoose";
import color from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected To Mongodb Database ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`MongoDB Error ${error}`);
  }
};

export default connectDB;
