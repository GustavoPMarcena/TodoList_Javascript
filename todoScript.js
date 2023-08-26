//Script do todo 
let addBtn = document.getElementById("submitButton");
let todoNewContent;
let todoDiv = document.querySelector(".container");
let todoArray = [];
let isLoad = true;
let divId = 0;



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
    const buttonElement = targetElement.closest("button")

    if (targetElement.classList.contains("eraseTodoButton")) {
        let id = parentElement.id;
        deleteTodo(id);
        parentElement.remove();
    } else {
        try {
            if (buttonElement.classList.contains("eraseTodoButton")) {
                let divFocus = buttonElement.closest("div");
                deleteTodo(divFocus.id);
                parentElement.remove();
            }

        }
        catch(error){
            console.log(error);
        }
    }

    if (targetElement.classList.contains("completeTodoButton") ) {
            if (parentElement.classList.contains("todoComplete")) {
                parentElement.classList.remove("todoComplete");
            } else {
                parentElement.classList.add("todoComplete");
            }

    } else{
        try{
            if(buttonElement.classList.contains("completeTodoButton")){
                let divFocus = buttonElement.closest("div");
                if (divFocus.classList.contains("todoComplete")) {
                    divFocus.classList.remove("todoComplete");
                } else {
                    divFocus.classList.add("todoComplete");
                }
                divFocus.classList.add("todoComplete");
            }
        }catch(error){
            console.log(error);
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

function deleteTodo(id) {
    let storageItens = localStorage.getItem("todoList");
    storageItens = storageItens.split(",");
    storageItens.splice(id, 1);
    console.log(storageItens.length);
    if (storageItens.length == 0) {
        localStorage.removeItem("todoList");
    } else {
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
        } else {
            localStorage.setItem("todoList", todoNewContent);
        }


    }
}



