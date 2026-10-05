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
