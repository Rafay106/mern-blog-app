import mongoose from "mongoose";

async function connectDB() {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://rafay106:Ej6MsfES3KrAfC1a@firstcluster.hts6iu1.mongodb.net/Practice"
    );
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export default connectDB;
