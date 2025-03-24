document.getElementById("registerForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Ngăn form reload trang

  // Lấy giá trị từ input
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();
  let confirmPassword = document.getElementById("confirmPassword").value.trim();

  // Reset thông báo lỗi
  document.getElementById("emailError").textContent = "";
  document.getElementById("passwordError").textContent = "";
  document.getElementById("confirmPasswordError").textContent = "";
  document.getElementById("successMessage").textContent = "";

  // Kiểm tra email hợp lệ
  if (email === "") {
      document.getElementById("emailError").textContent = "Email không được để trống!";
      return;
  }
  if (!validateEmail(email)) {
      document.getElementById("emailError").textContent = "Email không hợp lệ!";
      return;
  }

  // Kiểm tra mật khẩu hợp lệ
  if (password === "") {
      document.getElementById("passwordError").textContent = "Mật khẩu không được để trống!";
      return;
  }
  if (password.length < 6) {
      document.getElementById("passwordError").textContent = "Mật khẩu phải có ít nhất 6 ký tự!";
      return;
  }

  // Kiểm tra xác nhận mật khẩu
  if (confirmPassword !== password) {
      document.getElementById("confirmPasswordError").textContent = "Mật khẩu xác nhận không khớp!";
      return;
  }

  // Kiểm tra xem email đã tồn tại trong Local Storage chưa
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let existingUser = users.find(user => user.email === email);

  if (existingUser) {
      document.getElementById("emailError").textContent = "Email đã được đăng ký!";
      return;
  }

  // Lưu tài khoản vào Local Storage
  users.push({ email: email, password: password });
  localStorage.setItem("users", JSON.stringify(users));

  // Hiển thị thông báo thành công
  document.getElementById("successMessage").textContent = "Đăng ký thành công!";
  
  // Xóa input
  document.getElementById("registerForm").reset();
});

// Hàm kiểm tra định dạng email
function validateEmail(email) {
  let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
