const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();

/**
 * Environment variables
 * These should come from Docker / Kubernetes
 */
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL; // e.g. mongodb://admin:password@mongo-service:27017
const DB_NAME = "apnacollege-db";

/**
 * Middleware
 */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

/**
 * MongoDB Client (single connection per pod)
 */
const client = new MongoClient(MONGO_URL);
let db;

/**
 * Connect to MongoDB (only once)
 */
async function connectDB() {
    if (!db) {
        await client.connect();
        db = client.db(DB_NAME);
        console.log("✅ Connected to MongoDB");
    }
    return db;
}

/**
 * GET all users
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
        res.status(500).json({ error: "Database error" });
    }
});

/**
 * POST new user
 */
app.post("/addUser", async (req, res) => {
    try {
        const database = await connectDB();
        const result = await database
            .collection("users")
            .insertOne(req.body);

        res.status(201).json(result);
    } catch (err) {
        console.error("❌ POST /addUser error:", err);
        res.status(500).json({ error: "Database error" });
    }
});

/**
 * Start server
 * IMPORTANT: 0.0.0.0 is required for Docker & Kubernetes
 */
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
