const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();

/**
 * Environment variables
 */
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = "apnacollege-db";

/**
 * Middleware
 */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

/**
 * MongoDB Client
 */
const client = new MongoClient(MONGO_URL);

let db;

/**
 * Connect to MongoDB
 */
async function connectDB() {
    try {
        if (!db) {
            await client.connect();
            db = client.db(DB_NAME);

            console.log("✅ Connected to MongoDB Atlas");
        }

        return db;
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err);
        throw err;
    }
}

/**
 * Get all users
 */
app.get("/getUsers", async (req, res) => {
    try {
        const database = await connectDB();

        const users = await database
            .collection("users")
            .find({})
            .toArray();

        res.status(200).json(users);

    } catch (err) {
        console.error("❌ GET /getUsers error:", err);

        res.status(500).json({
            error: "Database error"
        });
    }
});

/**
 * Add User
 */
app.post("/addUser", async (req, res) => {
    try {
        console.log("📥 User received:", req.body);

        const database = await connectDB();

        const result = await database
            .collection("users")
            .insertOne(req.body);

        console.log("✅ User inserted:", result.insertedId);

        res.status(201).json({
            success: true,
            insertedId: result.insertedId
        });

    } catch (err) {
        console.error("❌ POST /addUser error:", err);

        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

/**
 * Health Check
 */
app.get("/health", async (req, res) => {
    try {
        await connectDB();

        res.status(200).json({
            status: "UP",
            database: "CONNECTED"
        });

    } catch (err) {
        res.status(500).json({
            status: "DOWN",
            database: "DISCONNECTED",
            error: err.message
        });
    }
});

/**
 * Start Server
 */
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${PORT}`);
});