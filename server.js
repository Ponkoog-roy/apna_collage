const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;

const PORT = process.env.PORT || 5000;
const MONGO_URL = "mongodb://admin:password@mongo:27017"; // docker service name 'mongo'

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const client = new MongoClient(MONGO_URL);

async function connectDB() {
    if (!client.isConnected?.()) {
        await client.connect();
        console.log("Connected to MongoDB");
    }
    return client.db("apnacollege-db");
}

// GET all users
app.get("/getUsers", async (req, res) => {
    try {
        const db = await connectDB();
        const data = await db.collection("users").find({}).toArray();
        res.send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send("DB Error");
    }
});

// POST new user
app.post("/addUser", async (req, res) => {
    try {
        const db = await connectDB();
        const result = await db.collection("users").insertOne(req.body);
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("DB Error");
    }
});

// Listen on 0.0.0.0 so Docker exposes the port
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
