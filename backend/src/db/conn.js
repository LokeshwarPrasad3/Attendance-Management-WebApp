// Database Connection Setup
import mongoose from "mongoose";

const connectToDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.DB_URL);
        console.log(`MongoDB connected at Host ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log(`MongoDB connection failed : ${error}`);
        process.exit(1);
    }
}

export default connectToDB ;
