import express from "express";
import notesRouter from "./routes/notes.js";
import authRouter from "./routes/auth.js";
import cors from "cors";
import session from "express-session";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.method + " " + req.url);
  next();
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  }),
);

app.use("/api/notes", notesRouter);

app.use("/api/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use(errorHandler);

app.listen(process.env.PORT, () => console.log("Server is running"));
