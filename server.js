const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// Home route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// Form submit route
app.post("/submit-feedback", (req, res) => {
  console.log("Form Data Received:");
  console.log(req.body);

  res.send("Feedback received successfully!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});