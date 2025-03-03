import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const connectionString = process.env.CONNECTION_STRING as string;

    if (!connectionString) {
      throw new Error(
        "Database connection string is missing in environment variables."
      );
    }

    const connect = await mongoose.connect(connectionString);

    console.log(
      "Connected to the Database at host: " + connect.connection.host
    );
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1); // Exit with failure
  }
};

export default connectDB;
