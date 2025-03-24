document.getElementById("registerForm").addEventListener("submit", function(event) {
  event.preventDefault();

  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();
  let confirmPassword = document.getElementById("confirmPassword").value.trim();

  document.getElementById("emailError").textContent = "";
  document.getElementById("passwordError").textContent = "";
  document.getElementById("confirmPasswordError").textContent = "";
  document.getElementById("successMessage").textContent = "";

  if (email === "") {
      document.getElementById("emailError").textContent = "Email không được để trống!";
      return;
  }
  if (!validateEmail(email)) {
      document.getElementById("emailError").textContent = "Email không hợp lệ!";
      return;
  }

  if (password === "") {
      document.getElementById("passwordError").textContent = "Mật khẩu không được để trống!";
      return;
  }
  if (password.length < 6) {
      document.getElementById("passwordError").textContent = "Mật khẩu phải có ít nhất 6 ký tự!";
      return;
  }

  if (confirmPassword !== password) {
      document.getElementById("confirmPasswordError").textContent = "Mật khẩu xác nhận không khớp!";
      return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let existingUser = users.find(user => user.email === email);

  if (existingUser) {
      document.getElementById("emailError").textContent = "Email đã được đăng ký!";
      return;
  }

  users.push({ email: email, password: password });
  localStorage.setItem("users", JSON.stringify(users));

  document.getElementById("successMessage").textContent = "Đăng ký thành công!";
  
  document.getElementById("registerForm").reset();
});

function validateEmail(email) {
  let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
