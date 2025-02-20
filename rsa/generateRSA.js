import fs from 'fs'
const NodeRSA = require("node-rsa");

const key = new NodeRSA({ b: 2048 });

// Generate private & public keys
const privateKey = key.exportKey("private");
const publicKey = key.exportKey("public");

// Simpan ke file
fs.writeFileSync("rsa/private.pem", privateKey);
fs.writeFileSync("rsa/public.pem", publicKey);

console.log("RSA keys generated successfully!");
