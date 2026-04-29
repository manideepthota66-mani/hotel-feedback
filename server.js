const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// MongoDB Connection
mongoose.connect("mongodb://admin:Mani12345@ac-q7crin9-shard-00-00.ns7vfac.mongodb.net:27017,ac-q7crin9-shard-00-01.ns7vfac.mongodb.net:27017,ac-q7crin9-shard-00-02.ns7vfac.mongodb.net:27017/?ssl=true&replicaSet=atlas-fbs9zn-shard-0&authSource=admin&appName=Cluster0")
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.log("Mongo Error:", err));

// Schema
const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  service: String,
  food: String,
  comments: String
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

// Home route → form
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Submit route
app.post("/submit-feedback", async (req, res) => {
  try {
    console.log("Incoming Data:", req.body);

    const newFeedback = new Feedback(req.body);
    await newFeedback.save();

    console.log("Saved to DB:", req.body);

    res.send("Feedback saved successfully!");
  } catch (error) {
    console.log(error);
    res.send("Error saving feedback");
  }
});

// Admin route → table
app.get("/admin", async (req, res) => {
  const data = await Feedback.find();

  let html = `
  <html>
  <head>
    <title>Admin Dashboard</title>
    <style>
      body {
        font-family: Arial;
        background: #f4f6f9;
        padding: 20px;
      }
      h1 {
        text-align: center;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        background: white;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
      }
      th, td {
        padding: 12px;
        border-bottom: 1px solid #ddd;
        text-align: center;
      }
      th {
        background: #007bff;
        color: white;
      }
      tr:hover {
        background: #f1f1f1;
      }
    </style>
  </head>
  <body>

    <h1>📊 Feedback Dashboard</h1>

    <table>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Age</th>
        <th>Service</th>
        <th>Food</th>
        <th>Comments</th>
      </tr>
  `;

  data.forEach(item => {
    html += `
      <tr>
        <td>${item.name}</td>
        <td>${item.email}</td>
        <td>${item.age}</td>
        <td>${item.service}</td>
        <td>${item.food}</td>
        <td>${item.comments}</td>
      </tr>
    `;
  });

  html += `
    </table>
  </body>
  </html>
  `;

  res.send(html);
});
// Server start
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});