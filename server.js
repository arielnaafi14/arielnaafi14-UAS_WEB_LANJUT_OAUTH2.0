import express from "express";
import bodyParser from "body-parser";
import cors from 'cors'
import mysql from 'mysql2/promise'
import fs from 'fs'
import dotenv from 'dotenv'

process.env.PUBLIC_KEY = fs.readFileSync("rsa/public.pem", "utf8");
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import tokenRoutes from "./routes/tokenRoutes.js"


const app = express();
dotenv.config()
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "oauth2_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Load RSA keys
const privateKey = fs.readFileSync("rsa/private.pem", "utf8");
const publicKey = fs.readFileSync("rsa/public.pem", "utf8");

// Routes
app.use("/auth", authRoutes(db, privateKey));
app.use("/users", userRoutes(db));
app.use("/tokens", tokenRoutes(db));

app.use(express.static("public"));

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
