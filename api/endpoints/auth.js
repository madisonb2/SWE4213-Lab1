const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const authcheck = require("../middleware/authcheck");

const SECRET_KEY = "unb_marketplace_secret_key";
const SALT_ROUNDS = 10;

router.post("/auth/register", async (req, res) => {
    const pool = req.app.get('db');
    const { email, password } = req.body; // Changed 'username' to 'email' to match your schema

    if (!email.toLowerCase().endsWith("@unb.ca")) {
        return res.status(403).json({
            message: "Registration is only available for UNB students (@unb.ca)."
        });
    }

    //Resolved issue 1 by adding checks to ensure password is valid.
    if (password.length < 8) {
        return res.status(403).json({
            message: "Password must be at least 8 characters."
        })
    }

    if (!/\d/.test(password) || !/[^a-zA-Z0-9]/.test(password) ) {
        return res.status(403).json({
            message: "Password must contain at least 1 special character and 1 number."
        })
    }

    try {
        // 1. Check if user already exists
        const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (userExists.rows.length > 0) {
            return res.status(409).json({ message: "User already exists" });
        }

        // 2. Hash the password
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        // 3. Insert into PostgreSQL
        await pool.query(
            "INSERT INTO users (email, password) VALUES ($1, $2)",
            [email, hashedPassword]
        );

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating user" });
    }
});

router.post("/auth/login", async (req, res) => {
    const pool = req.app.get('db');
    const { email, password } = req.body;

    try {
        // 1. Find user by email
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        const user = result.rows[0];

        if (user) {
            // 2. Compare password with the stored hash
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                const token = jwt.sign(
                    { userId: user.id, email: user.email },
                    SECRET_KEY,
                    { expiresIn: '1h' }
                );

                return res.status(200).json({
                    message: "Login successful",
                    token: token,
                    user: { id: user.id, email: user.email }
                });
            }
        }

        res.status(401).json({ message: "Invalid credentials" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error during login" });
    }
});

router.get("/auth/status", authcheck, async (req, res) => {
    const pool = req.app.get('db');

    try {
        // Find user by the ID attached to req.user by the authcheck middleware
        const result = await pool.query("SELECT id, email FROM users WHERE id = $1", [req.user.userId]);
        const user = result.rows[0];

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User is logged in.",
            user: { id: user.id, email: user.email }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error checking status" });
    }
});

module.exports = router;