import express from "express";

const tokenRoutes = (db) => {
  const router = express.Router();

  // READ: Ambil daftar token
  router.get("/", async (req, res) => {
    console.log("Menerima permintaan GET untuk daftar token...");
    try {
      const [tokens] = await db.query("SELECT * FROM oauth_tokens");
      console.log("Daftar token ditemukan:", tokens);
      res.json(tokens);
    } catch (err) {
      console.error("Gagal mengambil token:", err.message);
      res.status(500).json({ error: err.message });
    }
  });

  // UPDATE: Perbarui token berdasarkan ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { token_value } = req.body;  // Pastikan token_value ada di body request

  console.log(`Menerima permintaan PUT untuk token ID: ${id} dengan value baru: ${token_value}`);

  try {
    // Periksa apakah token yang diminta ada di database
    const [existingToken] = await db.query("SELECT * FROM oauth_tokens WHERE id = ?", [id]);

    if (existingToken.length === 0) {
      console.log(`Token dengan ID ${id} tidak ditemukan.`);
      return res.status(404).json({ message: "Token tidak ditemukan." });
    }

    // Perbarui token
    const [result] = await db.query(
      "UPDATE oauth_tokens SET token_value = ? WHERE id = ?",
      [token_value, id]
    );

    if (result.affectedRows === 0) {
      console.log(`Gagal memperbarui token ID ${id}.`);
      return res.status(400).json({ message: "Gagal memperbarui token." });
    }

    console.log(`Token dengan ID ${id} berhasil diperbarui.`);
    res.json({ message: "Token berhasil diperbarui." });
  } catch (err) {
    console.error("Gagal memperbarui token:", err.message);
    res.status(500).json({ error: err.message });
  }
});


  // DELETE: Hapus token berdasarkan ID
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    console.log(`Menerima permintaan DELETE untuk token ID: ${id}`);

    try {
      const [result] = await db.query("DELETE FROM oauth_tokens WHERE id = ?", [id]);

      if (result.affectedRows === 0) {
        console.log(`Gagal menghapus: Token dengan ID ${id} tidak ditemukan.`);
        return res.status(404).json({ message: "Token tidak ditemukan." });
      }

      console.log(`Token dengan ID ${id} berhasil dihapus.`);
      res.json({ message: "Token berhasil dihapus." });
    } catch (err) {
      console.error("Gagal menghapus token:", err.message);
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};

export default tokenRoutes;