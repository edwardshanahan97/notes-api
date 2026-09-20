import express from "express";

const app = express();

app.get("/notes", (req, res) => {
  res.send("Hello from notes");
});

app.listen(3000, () => console.log("Server is running"));
