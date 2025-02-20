import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authRoutes = (db, privateKey) => {
  const router = express.Router();

  // Login route
  router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    console.log("Menerima permintaan login:", username);

    if (!username || !password) {
      console.log("Login gagal: Username atau password kosong.");
      return res.status(400).json({ message: "Username dan password diperlukan." });
    }

    try {
      console.log("Mengecek username di database...");
      const [users] = await db.query("SELECT * FROM users WHERE username = ?", [username]);

      if (users.length === 0) {
        console.log("Login gagal: Username tidak ditemukan.");
        return res.status(401).json({ message: "Username tidak ditemukan" });
      }

      const user = users[0];
      console.log("Mengecek kecocokan password...");
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        console.log("Login gagal: Password salah.");
        return res.status(401).json({ message: "Password salah" });
      }

      console.log("Login berhasil. Membuat token JWT...");
      const token = jwt.sign({ id: user.id, username: user.username }, privateKey, {
        algorithm: "RS256",
        expiresIn: "1h",
      });

      console.log("Token berhasil dibuat:", token);
      res.json({ message: "Login berhasil", token });
    } catch (err) {
      console.error("Terjadi kesalahan saat login:", err.message);
      res.status(500).json({ message: "Terjadi kesalahan", error: err.message });
    }
  });

  return router;
};

export default authRoutes;