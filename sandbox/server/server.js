import "dotenv/config";
import mongoose from "mongoose";
import app from "./src/app.js";

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;

if (MONGO_URI) {
    console.log("Connecting to MongoDB...");
    mongoose.connect(MONGO_URI)
        .then(() => {
            console.log("Successfully connected to MongoDB");
        })
        .catch((error) => {
            console.error("Error connecting to MongoDB:", error.message);
        });
} else {
    console.log("No MongoDB URI specified in environment variables. Continuing without database connection.");
}

app.listen(PORT, () => {
    console.log(`Sandbox API server is running on port ${PORT}`);
});