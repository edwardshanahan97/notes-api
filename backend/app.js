import express from "express";
import notesRouter from "./routes/notes.js";
import authRouter from "./routes/auth.js";
import cors from "cors";
import session from "express-session";
import errorHandler from "./middleware/errorHandler.js";
import authLimiter from "./middleware/authLimiter.js";
import helmet from "helmet";
import checkOrigin from "./middleware/checkOrigin.js";

const app = express();
app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  }),
);
const isProduction = process.env.NODE_ENV === "production";

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
      secure: isProduction,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);

app.use(checkOrigin);

app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);

app.use("/api/notes", notesRouter);
app.use("/api/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use(errorHandler);

export default app;
