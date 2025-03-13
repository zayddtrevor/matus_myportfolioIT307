const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", loadTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", handleTodoClick);
filterOption.addEventListener("change", filterTodos);

function addTodo(event) {
    event.preventDefault();
    if (!todoInput.value.trim()) return;

    createTodoElement(todoInput.value);
    saveTodos(todoInput.value);
    todoInput.value = "";
}

function handleTodoClick(e) {
    const item = e.target;
    const todo = item.closest(".todo");

    if (item.classList.contains("trash-btn")) {
        todo.classList.add("slide");
        removeTodos(todo);
        todo.addEventListener("transitionend", () => todo.remove());
    }

    if (item.classList.contains("complete-btn")) {
        todo.classList.toggle("completed");
    }
}

function filterTodos(e) {
    const todos = todoList.childNodes;
    todos.forEach(todo => {
        todo.style.display = 
            (e.target.value === "all" || 
            (e.target.value === "completed" && todo.classList.contains("completed")) ||
            (e.target.value === "incomplete" && !todo.classList.contains("completed"))) 
            ? "flex" : "none";
    });
}

function saveTodos(todo) {
    const todos = JSON.parse(localStorage.getItem("todos") || "[]");
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
    JSON.parse(localStorage.getItem("todos") || "[]").forEach(createTodoElement);
}

function removeTodos(todo) {
    let todos = JSON.parse(localStorage.getItem("todos") || "[]");
    todos = todos.filter(t => t !== todo.children[0].innerText);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function createTodoElement(text) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    todoDiv.innerHTML = `
        <li class="todo-item">${text}</li>
        <button class="complete-btn"><i class="fas fa-check-circle"></i></button>
        <button class="trash-btn"><i class="fas fa-trash"></i></button>
    `;
    todoList.appendChild(todoDiv);
}
