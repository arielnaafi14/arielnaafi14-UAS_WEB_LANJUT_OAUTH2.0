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
```,
- **`db/`**: Berisi koneksi dan konfigurasi ke database **MySQL**.  
- **`models/`**: Model untuk tabel **user** dan **token** dalam database.  
- **`public/`**: File statis seperti **HTML**, **CSS**, dan **JS** untuk tampilan frontend.  
- **`routes/`**: Definisi endpoint untuk autentikasi **OAuth2** dan manajemen pengguna.  
- **`rsa/`**: Kunci **RSA** dan skrip untuk generate kunci.  
- **`utils/`**: Helper functions seperti operasi **RSA**.  
- **`.env`**: Variabel lingkungan seperti `CLIENT_ID`, `CLIENT_SECRET`, dan koneksi DB.  
- **`config.js`**: Konfigurasi global untuk aplikasi termasuk **OAuth2** dan **DB**.  
- **`server.js`**: Entry point aplikasi menggunakan **Node.js** dan **Express.js**.
```

# Struktur Database
 ```.
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    refresh_token TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
# Alur Otentikasi OAuth2
* User klik tombol "Login" di halaman utama.
* Popup Form muncul dan meminta username & password.
* Data dikirim ke backend untuk validasi.
* Setelah sukses, backend menghasilkan access token yang dienkripsi menggunakan RSA.
* Token dikirim ke terminal tools vscode
* User berhasil login tanpa me-refresh halaman utama.

# Kontribusi Tim
- Backend     : Zafi Zunaidi Aziz
- Penguji     : Adimas Alif Priarta
- Dokumentasi : Muhammad Ariel Naafi'


