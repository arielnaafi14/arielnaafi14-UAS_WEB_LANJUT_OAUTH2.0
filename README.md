# UAS WEB LANJUT 
Proyek ini mengimplementasikan sistem otentikasi OAuth2 menggunakan Node.js dengan popup form. Data pengguna disimpan dan dikelola melalui MySQL, sementara keamanan autentikasi diperkuat dengan enkripsi RSA.

# FITUR
*Otentikasi OAuth2 berbasis token.
*Enkripsi dan dekripsi token menggunakan RSA.
*MySQL sebagai basis data untuk manajemen pengguna.
*Popup Form untuk proses login tanpa reload halaman.
*API berbasis Node.js menggunakan framework Express.js.
*Private and Public Key
*Authentication CRUD

# Struktur Direktori
- **`db/`**: Berisi koneksi dan konfigurasi ke database **MySQL**.  
- **`models/`**: Model untuk tabel **user** dan **token** dalam database.  
- **`public/`**: File statis seperti **HTML**, **CSS**, dan **JS** untuk tampilan frontend.  
- **`routes/`**: Definisi endpoint untuk autentikasi **OAuth2** dan manajemen pengguna.  
- **`rsa/`**: Kunci **RSA** dan skrip untuk generate kunci.  
- **`utils/`**: Helper functions seperti operasi **RSA**.  
- **`.env`**: Variabel lingkungan seperti `CLIENT_ID`, `CLIENT_SECRET`, dan koneksi DB.  
- **`config.js`**: Konfigurasi global untuk aplikasi termasuk **OAuth2** dan **DB**.  
- **`server.js`**: Entry point aplikasi menggunakan **Node.js** dan **Express.js**.


