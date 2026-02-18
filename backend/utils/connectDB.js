import mongoose from "mongoose";

const connectDB = async () => {
  const clientOptions = {
    serverApi: { version: "1", strict: true, deprecationErrors: true },
  };
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
