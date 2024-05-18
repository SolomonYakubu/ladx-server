import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "");
        console.log("database connected");
    } catch (error: any) {
        console.log(error.message);
    }
};

export { connectDB };