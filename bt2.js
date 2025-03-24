document.addEventListener("DOMContentLoaded", function () {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let editingIndex = null;

    function saveTasksToLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTasks() {
        let tableBody = document.getElementById("taskTable");
        tableBody.innerHTML = "";

        tasks.forEach((task, index) => {
            let row = `<tr>
                <td>${index + 1}</td>
                <td>${task.content}</td>
                <td>${task.dueDate}</td>
                <td>${task.status}</td>
                <td>${task.assignedTo}</td>
                <td>
                    <button class="edit-btn" onclick="editTask(${index})">Sửa</button>
                    <button class="delete-btn" onclick="deleteTask(${index})">Xóa</button>
                </td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    }

    window.editTask = function (index) {
        let task = tasks[index];
        document.getElementById("content").value = task.content;
        document.getElementById("dueDate").value = task.dueDate;
        document.getElementById("status").value = task.status;
        document.getElementById("assignedTo").value = task.assignedTo;
        editingIndex = index;
    };

    window.deleteTask = function (index) {
        tasks.splice(index, 1);
        saveTasksToLocalStorage();
        renderTasks();
    };

    document.getElementById("submitBtn").addEventListener("click", function () {
        let content = document.getElementById("content").value.trim();
        let dueDate = document.getElementById("dueDate").value;
        let status = document.getElementById("status").value;
        let assignedTo = document.getElementById("assignedTo").value.trim();

        if (!content || !dueDate || !assignedTo) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        if (editingIndex !== null) {
            tasks[editingIndex] = { content, dueDate, status, assignedTo };
            editingIndex = null;
        } else {
            tasks.push({ content, dueDate, status, assignedTo });
        }

        saveTasksToLocalStorage();
        renderTasks();
        document.getElementById("content").value = "";
        document.getElementById("dueDate").value = "";
        document.getElementById("status").value = "Pending";
        document.getElementById("assignedTo").value = "";
    });

    renderTasks();
});
