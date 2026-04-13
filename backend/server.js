const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(express.json());

// DB connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "your_db_name"
});
db.connect();
db.connect(err => {
  if (err) {
    console.log("DB error:", err);
  } else {
    console.log("DB connected");
  }
});

app.get("/", (req, res) => {
  res.send("Backend running");
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});