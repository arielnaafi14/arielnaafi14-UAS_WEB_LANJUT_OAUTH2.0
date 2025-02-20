import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userRoutes = (db) => {
  const router = express.Router();

  // Middleware untuk verifikasi Access Token
  function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      console.log("Akses ditolak: Token tidak ditemukan.");
      return res.status(401).json({ message: "Akses ditolak. Token tidak ditemukan!" });
    }

    jwt.verify(token, process.env.PUBLIC_KEY, { algorithms: ["RS256"] }, (err, user) => {
      if (err) {
        console.log("Token tidak valid atau sudah kedaluwarsa.");
        return res.status(403).json({ message: "Token tidak valid atau sudah kedaluwarsa!" });
      }

      console.log("Token valid. User:", user);
      req.user = user;
      next();
    });
  }

  // 🔹 **GET /users - Ambil semua pengguna (tanpa autentikasi)**
  router.get("/", async (req, res) => {
    try {
      const [users] = await db.query("SELECT id, username FROM users");
      console.log("Data pengguna berhasil diambil.");
      res.json(users);
    } catch (error) {
      console.error("Gagal mengambil data pengguna:", error.message);
      res.status(500).json({ message: "Gagal mengambil data pengguna" });
    }
  });

  // 🔹 **POST /users - Tambah pengguna baru (dengan autentikasi)**
  router.post("/", authenticateToken, async (req, res) => {
    const { username, password } = req.body;
    console.log("Menerima permintaan penambahan pengguna:", username);

    if (!username || !password) {
      console.log("Gagal menambahkan pengguna: Username atau password kosong.");
      return res.status(400).json({ message: "Username dan password wajib diisi." });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword]);
      console.log("Pengguna berhasil ditambahkan:", username);
      res.status(201).json({ message: "Pengguna berhasil ditambahkan." });
    } catch (err) {
      console.error("Gagal menambahkan pengguna:", err.message);
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};

export default userRoutes;
