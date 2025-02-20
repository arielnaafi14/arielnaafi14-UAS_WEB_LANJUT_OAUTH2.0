import fs from 'fs'
import path from 'path';
import NodeRSA from 'node-rsa';

const publicKeyPath = path.join(__dirname, "rsa/public.pem");
const privateKeyPath = path.join(__dirname, "rsa/private.pem");

let publicKey = null;
let privateKey = null;

try {
  if (fs.existsSync(publicKeyPath) && fs.existsSync(privateKeyPath)) {
    publicKey = new NodeRSA(fs.readFileSync(publicKeyPath, "utf8"));
    privateKey = new NodeRSA(fs.readFileSync(privateKeyPath, "utf8"));

    // Pastikan padding yang aman digunakan
    publicKey.setOptions({ encryptionScheme: "pkcs1" });
    privateKey.setOptions({ encryptionScheme: "pkcs1" });

    console.log("✅ Public dan Private Key berhasil dimuat!");
  } else {
    throw new Error("File kunci RSA tidak ditemukan.");
  }
} catch (error) {
  console.error("❌ Gagal membaca kunci RSA:", error.message);
}

function encryptData(data) {
  try {
    if (!publicKey) throw new Error("Public key tidak tersedia!");
    return publicKey.encrypt(data, "base64");
  } catch (error) {
    console.error("❌ Error saat enkripsi:", error.message);
    return null;
  }
}

function decryptData(data) {
  try {
    if (!privateKey) throw new Error("Private key tidak tersedia!");
    return privateKey.decrypt(data, "utf8");
  } catch (error) {
    console.error("❌ Error saat dekripsi:", error.message);
    return null;
  }
}

module.exports = { encryptData, decryptData, publicKey, privateKey };
