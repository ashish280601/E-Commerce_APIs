// Step 1. Import all the dependency
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.URL

// Step 2. Create a function to connect with mongoose.
export const connectUsingMongoose = async() => {
    try {

        await mongoose.connect(url
        //     {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true
        // }
    )
        console.log("MongoDB connected with mongoose");
    } catch (error) {
        console.log("Error While Connecting With Mongoose Database", error);
    }
}