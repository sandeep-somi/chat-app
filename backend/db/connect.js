import mongoose from "mongoose"

export const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log('Connected to DB');
  } catch (error) {
    console.error(error);
  }  
}