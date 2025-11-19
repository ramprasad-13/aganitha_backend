// connection.js
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()

const db = async()=>{
    try {
        // Await the connection promise
        await mongoose.connect(process.env.MONGO_URI); 
        // Note: No need to log success here, do it in app.js
    } catch (error) {
        console.error("❌ Database connection failed:", error); // Use console.error
        // Exiting process (1) here is fine, but it's redundant if app.js handles it.
        // I prefer letting the caller (app.js) handle the process exit logic.
        throw error; // Propagate the error up to the caller (startServer)
    }
}

export default db;