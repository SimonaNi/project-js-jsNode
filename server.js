const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const db = new sqlite3.Database("./comments.db");

app.use(express.json());
app.use(cors());

//create comms table if it doesn't exist
db.run("CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY, text TEXT)");

//route get all comments
app.get("/comments", (req, res) => {
    db.all("SELECT * FROM comments", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

//route to post new comm
app.post("/comments", (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: "Comment text is required" });
    }
    db.run("INSERT INTO comments (text) VALUES (?)", [text], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, text });
    });
});

//start the server (node server.js)
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
