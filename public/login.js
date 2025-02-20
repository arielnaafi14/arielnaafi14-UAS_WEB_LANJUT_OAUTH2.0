document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const loginPopup = document.getElementById("loginPopup");
  const openLoginBtn = document.getElementById("openLogin");
  const closeBtn = document.querySelector(".close");

  // Buka popup login
  openLoginBtn.addEventListener("click", function () {
    loginPopup.style.display = "flex";
  });

  // Tutup popup login
  closeBtn.addEventListener("click", function () {
    loginPopup.style.display = "none";
  });

  // Tutup popup jika klik di luar form
  window.addEventListener("click", function (event) {
    if (event.target === loginPopup) {
      loginPopup.style.display = "none";
    }
  });

  // Event submit form login
  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
      alert("Harap isi semua kolom!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login berhasil!");
        localStorage.setItem("authToken", data.token);
        console.log("Token:", data.token);
setTimeout(() => {
  window.location.href = "dashboard.html";
}, 2000);
 // Redirect ke dashboard
      } else {
        alert("Login gagal: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat login.");
    }
  });
});
