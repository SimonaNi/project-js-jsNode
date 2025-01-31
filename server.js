const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const db = new sqlite3.Database("database.db");
const SECRET_KEY = "your_secret_key";

app.use(express.json());
app.use(cors());

// Create tables
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY, username TEXT, comment TEXT)");
});

// Register user
app.post("/signup", (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).json({ error: "Error hashing password" });
        db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hash], err => {
            if (err) return res.status(400).json({ error: "Username already taken" });
            res.json({ message: "User registered" });
        });
    });
});

// Login user
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
        if (!user) return res.status(401).json({ error: "Invalid username or password" });
        bcrypt.compare(password, user.password, (err, result) => {
            if (!result) return res.status(401).json({ error: "Invalid username or password" });
            const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
            res.json({ token });
        });
    });
});

// Middleware to verify token
function authenticateToken(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ error: "Access denied" });
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid token" });
        req.user = user;
        next();
    });
}

// Post a comment
app.post("/comment", authenticateToken, (req, res) => {
    const { comment } = req.body;
    db.run("INSERT INTO comments (username, comment) VALUES (?, ?)", [req.user.username, comment], err => {
        if (err) return res.status(500).json({ error: "Failed to post comment" });
        res.json({ message: "Comment added" });
    });
});

// Get all comments
app.get("/comments", (req, res) => {
    db.all("SELECT * FROM comments", [], (err, rows) => {
        if (err) return res.status(500).json({ error: "Failed to fetch comments" });
        res.json(rows);
    });
});

app.listen(3000, () => console.log("Server running on port 3000"));
