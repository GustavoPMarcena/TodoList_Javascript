//Script do todo 
let addBtn = document.getElementById("submitButton");
let todoNewContent;
let todoDiv = document.querySelector(".todoDiv");
let todoArray = [];
let isLoad = true;
// EVENTOS
document.onload = loadPage();

addBtn.addEventListener("click", () => {
    todoNewContent = document.getElementById("inputLabel").value;
    if (todoNewContent) {
        todoArray.push(todoNewContent);
        document.getElementById("inputLabel").value = '';
        console.log(todoArray);
        isLoad = false;
        addTodo();
    }


});

document.addEventListener("keypress", (key) => {
    if (key.code == "Enter") {
        todoNewContent = document.getElementById("inputLabel").value;
        if (todoNewContent) {
            todoArray.push(todoNewContent);
            document.getElementById("inputLabel").value = '';
            console.log(todoArray);
            isLoad = false;
            addTodo();
        }
    }
})

document.addEventListener("click", (e) => {
    const targetElement = e.target;
    const parentElement = targetElement.closest("div");

    if (targetElement.classList.contains("eraseTodoButton")) {
        parentElement.remove();
    }

    if (targetElement.classList.contains("completeTodoButton")) {
        if (parentElement.classList.contains("todoComplete")) {
            parentElement.classList.remove("todoComplete");
        } else {
            parentElement.classList.add("todoComplete");
        }

    }




});

// FUNÇÕES

// Para carregar a página é verificado no local storage se tem algum dado guardado
function loadPage() {
    if (localStorage.length != 0) {
        let a = localStorage.getItem("todoList");
        a = a.split(",");
        isLoad = true;
        a.forEach(element => {
            todoNewContent = element;
            addTodo();
        });
    }

}

function addTodo() {
    todoArray.push(todoNewContent);
    const todo = document.createElement("div");
    todo.classList.add("todoMsg");

    const todoText = document.createElement("p");
    todoText.textContent = todoNewContent;
    todo.appendChild(todoText);

    const eraseButton = document.createElement("button");
    const completeButton = document.createElement("button");
    eraseButton.innerHTML = '<span class="material-symbols-outlined">close</span>';
    eraseButton.classList.add("eraseTodoButton");
    completeButton.innerHTML = '<span class="material-symbols-outlined">done</span>';
    completeButton.classList.add("completeTodoButton");
    todo.appendChild(eraseButton);
    todo.appendChild(completeButton);
    todoDiv.appendChild(todo);

    if (!isLoad) {
        if (localStorage.length != 0) {
            let storageItens = localStorage.getItem("todoList");
            storageItens = storageItens.split(",");
            storageItens.push(todoNewContent);
            localStorage.setItem("todoList", storageItens);
        } else{
            localStorage.setItem("todoList", todoNewContent);
        }

        
    }
}



