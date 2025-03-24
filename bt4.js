let todos = JSON.parse(localStorage.getItem("todos")) || [];

const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

function renderTodos() {
    todoList.innerHTML = "";

    todos.forEach((todo, index) => {
        const li = document.createElement("li");
        li.classList.add("todo-item");
        li.innerHTML = `
            <span>${todo}</span>
            <button class="deleteBtn" onclick="deleteTodo(${index})">Xóa</button>
        `;
        todoList.appendChild(li);
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}

addBtn.addEventListener("click", function () {
    const todoText = todoInput.value.trim();
    if (todoText !== "") {
        todos.push(todoText);
        todoInput.value = ""; 
        renderTodos(); 
    }
});

function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodos();
}

renderTodos();
