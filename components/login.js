const form = document.getElementById("loginForm");

const users = [
  { username: "reptile", password: "12345" },
  { username: "admin", password: "admin123" },
  { username: "owner", password: "rumahreptile" }
];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  let valid = false;

  for (let i = 0; i < users.length; i++) {
    if (
      users[i].username === username &&
      users[i].password === password
    ) {
      valid = true;
      break;
    }
  }

  if (!valid) {
    alert("❌ Username atau password salah!")
} else {
    window.location.href = "../index.html"
  }
});