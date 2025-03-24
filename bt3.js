document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();
  let errorMessage = document.getElementById("errorMessage");

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let validUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (validUser) {
    localStorage.setItem("loggedInUser", JSON.stringify(validUser));
    alert("Đăng nhập thành công!");
    window.location.href = "home.html";
  } else {
    errorMessage.textContent = "Email hoặc mật khẩu không đúng!";
  }
});
