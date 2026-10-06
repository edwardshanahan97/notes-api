import pool from "../database/db.js";
import argon2 from "argon2";
import validateEmail from "../utils/validateEmail.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "Invalid name" });
  }

  try {
    if (
      typeof email !== "string" ||
      email.trim() === "" ||
      !validateEmail(email)
    ) {
      return res.status(400).json({ error: "Invalid email" });
    }

    if (typeof password !== "string" || password.length < 8) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const normaliseName = name.trim();
    const normaliseEmail = email.trim().toLowerCase();

    const emailResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [normaliseEmail],
    );

    if (emailResult.rowCount > 0) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const passwordHash = await argon2.hash(password);

    const userResult = await pool.query(
      "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email, created_at",
      [normaliseName, normaliseEmail, passwordHash],
    );

    res.status(201).json(userResult.rows[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal server error!" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (
    typeof email !== "string" ||
    email.trim() === "" ||
    !validateEmail(email)
  ) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  if (typeof password !== "string" || password.trim() === "") {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  try {
    const normaliseEmail = email.trim().toLowerCase();

    const user = await pool.query(
      "SELECT id, name, email, password_hash, created_at FROM users WHERE email = $1",
      [normaliseEmail],
    );

    if (user.rowCount === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const passwordHash = user.rows[0].password_hash;

    const isValidPassword = await argon2.verify(passwordHash, password);

    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const { id, name, email: emailResult, created_at } = user.rows[0];

    req.session.userId = id;

    res.json({ id, name, email: emailResult, created_at });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal server error!" });
  }
};

export const getCurrentUser = async (req, res) => {
  const userId = req.session.userId;

  console.log(req.session.userId);

  if (!userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const userResult = await pool.query(
      "SELECT id, name, email, created_at FROM users WHERE id = $1",
      [userId],
    );

    if (userResult.rowCount === 0) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    res.json(userResult.rows[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal server error!" });
  }
};

export const logout = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({ error: "Internal server error!" });
    } else {
      res.status(204).end();
    }
  });
};
