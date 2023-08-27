//Script do todo 
let addBtn = document.getElementById("submitButton");
let todoNewContent;
let todoDiv = document.querySelector(".container");
let todoArray = [];
let isLoad = true;
let divId = 0;

// usada em load todo
let localComplete = false;


// EVENTOS
document.onload = loadPage();

addBtn.addEventListener("click", () => {
    todoNewContent = document.getElementById("inputLabel").value;
    if (todoNewContent) {
        todoArray.push(todoNewContent);
        document.getElementById("inputLabel").value = '';

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


    // Delete Button
    if (targetElement.classList.contains("eraseTodoButton")) {
        let id = parentElement.id;
        parentElement.remove();
        deleteTodo(id);

    }

    //Complete Button
    if (targetElement.classList.contains("completeTodoButton")) {
        if (parentElement.classList.contains("todoComplete")) {
            parentElement.classList.remove("todoComplete");
            let id = parentElement.id;
            addCompleteTodo(id, false);

        } else {
            parentElement.classList.add("todoComplete");
            let id = parentElement.id;
            addCompleteTodo(id, true);
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
            localComplete = verifyComplete(element);
            element = element.replace(/:1/g, "");
            console.log(element);
            todoNewContent = element;
            addTodo();
            localComplete = false;
        });
    }
}

function verifyComplete(string) {
    const index = string.indexOf(":1");

    if (index > -1) {
        return true;
    } else {
        return false;
    }
}

function deleteTodo(id) {
    let storageItens = localStorage.getItem("todoList");
    storageItens = storageItens.split(",");
    storageItens.splice(id, 1);
    if (storageItens.length == 0) {
        localStorage.removeItem("todoList");
        divId = 0;
    } else {
        localStorage.setItem("todoList", storageItens);
        divId--;
    }
    reloadTodos();

}

//Em modificação

function reloadTodos() {
    const div = document.getElementById("containerDiv");

    const taskDivs = div.querySelectorAll(".todoMsg");
    console.log(taskDivs);
    let index = 0;
    taskDivs.forEach(element => {
        element.setAttribute("id", index);
        index++;
    });


}



function addCompleteTodo(id, isComplete) {
    let storageItens = localStorage.getItem("todoList");
    storageItens = storageItens.split(",");
    if (isComplete) {
        storageItens[id] = `${storageItens[0]}:1`;
        localStorage.setItem("todoList", storageItens);
    } else {
        storageItens[id] = storageItens[id].replace(/:1/g, "");
        localStorage.setItem("todoList", storageItens);
    }
}

function addTodo() {
    todoArray.push(todoNewContent);
    const todo = document.createElement("div");
    todo.id = divId;
    divId++;
    todo.classList.add("todoMsg");

    const todoText = document.createElement("p");
    todoText.textContent = todoNewContent;
    todo.appendChild(todoText);

    const eraseButton = document.createElement("button");
    const completeButton = document.createElement("button");
    eraseButton.textContent = "X";
    eraseButton.classList.add("eraseTodoButton");
    completeButton.textContent = "V";
    completeButton.classList.add("completeTodoButton");
    if (localComplete) {
        todo.classList.add("todoComplete");
    }

    todo.appendChild(eraseButton);
    todo.appendChild(completeButton);
    todoDiv.appendChild(todo);

    if (!isLoad) {
        if (localStorage.length != 0) {
            let storageItens = localStorage.getItem("todoList");
            storageItens = storageItens.split(",");
            storageItens.push(todoNewContent);
            localStorage.setItem("todoList", storageItens);
        } else {
            localStorage.setItem("todoList", todoNewContent);
        }


    }
}



