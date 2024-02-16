import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL, {
      useNewUrlParser: true,
    });
  } catch (err) {
    console.error(err.message);
  }
};

export default connectDB;
