import mysql from "mysql2/promise";
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "oauth2_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: process.env.DB_SSL ? { rejectUnauthorized: true } : false, // Tambahkan SSL jika diperlukan
});

// Uji koneksi ke database saat server mulai
(async () => {
  try {
    const connection = await db.getConnection();
    console.log(" Database connected successfully!");
    connection.release();
  } catch (error) {
    console.error(" Database connection failed:", error.message);
    process.exit(1); // Hentikan server jika gagal terhubung ke database
  }
})();

module.exports = db;
