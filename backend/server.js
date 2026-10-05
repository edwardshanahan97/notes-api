import express from "express";
import notesRouter from "./routes/notes.js";
import authRouter from "./routes/auth.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.method + " " + req.url);
  next();
});

app.use("/api/notes", notesRouter);

app.use("/api/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(process.env.PORT, () => console.log("Server is running"));
