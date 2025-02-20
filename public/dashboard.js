document.addEventListener("DOMContentLoaded", function () {
  const userTableBody = document.getElementById("userTableBody");
  const addUserForm = document.getElementById("addUserForm");
  const logoutBtn = document.getElementById("logoutBtn");

  const API_URL = "http://localhost:3000/users";
  const token = localStorage.getItem("authToken");

  if (!token) {
    alert("Anda belum login!");
    window.location.href = "index.html";
    return;
  }

  // 🔹 Fetch daftar pengguna dari server
  async function fetchUsers() {
    try {
      const response = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Cek apakah response adalah JSON yang valid
      const text = await response.text();
      try {
        const users = JSON.parse(text);
        userTableBody.innerHTML = "";
        users.forEach((user) => {
          const row = document.createElement("tr");
          row.innerHTML = `
                <td>${user.id}</td>
                <td>
                  <input type="text" value="${user.username}" id="user-${user.id}" />
                </td>
                <td>
                  <button onclick="updateUser(${user.id})">Update</button>
                  <button onclick="deleteUser(${user.id})">Hapus</button>
                </td>
              `;
          userTableBody.appendChild(row);
        });
      } catch (jsonError) {
        console.error("Response bukan JSON:", text);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  // 🔹 Tambah pengguna baru
  addUserForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const username = document.getElementById("newUsername").value;
    const password = document.getElementById("newPassword").value;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        alert("Pengguna berhasil ditambahkan!");
        fetchUsers();
        addUserForm.reset();
      } else {
        const data = await response.json();
        alert("Gagal menambah pengguna: " + data.message);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  });

  // 🔹 Update pengguna
  window.updateUser = async function (id) {
    const newUsername = document.getElementById(`user-${id}`).value;
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username: newUsername }),
      });

      if (response.ok) {
        alert("Pengguna berhasil diperbarui!");
        fetchUsers();
      } else {
        const data = await response.json();
        alert("Gagal memperbarui pengguna: " + data.message);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // 🔹 Hapus pengguna
  window.deleteUser = async function (id) {
    if (!confirm("Yakin ingin menghapus pengguna ini?")) return;
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        alert("Pengguna berhasil dihapus!");
        fetchUsers();
      } else {
        const data = await response.json();
        alert("Gagal menghapus pengguna: " + data.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // 🔹 Logout
  logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("authToken");
    alert("Anda telah logout!");
    window.location.href = "index.html";
  });

  // 🔹 Fetch users saat halaman dimuat
  fetchUsers();
});
