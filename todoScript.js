//Script do todo 
let addBtn = document.getElementById("submitButton");
let todoNewContent;
let todoDiv = document.querySelector(".todoDiv");
let todoArray = [];

// EVENTOS 

addBtn.addEventListener("click", () => {
    todoNewContent = document.getElementById("inputLabel").value;
    if (todoNewContent) {
        todoArray.push(todoNewContent);
        document.getElementById("inputLabel").value = '';
        console.log(todoArray);
        addTodo();
    }


});

document.addEventListener("keypress", (key) => {
    if (key.code == "Enter"){
        todoNewContent = document.getElementById("inputLabel").value;
        if (todoNewContent) {
            todoArray.push(todoNewContent);
            document.getElementById("inputLabel").value = '';
            console.log(todoArray);
            addTodo();
        }
    }
})

document.addEventListener("click", (e) => {
    const targetElement = e.target;
    const parentElement = targetElement.closest("div");

    if(targetElement.classList.contains("eraseTodoButton")){
        parentElement.remove();
    }

    if(targetElement.classList.contains("completeTodoButton")){
        if(parentElement.classList.contains("todoComplete")){
            parentElement.classList.remove("todoComplete");
        } else{
            parentElement.classList.add("todoComplete");
        }
        
    }




});

// FUNÇÕES

function addTodo() {
    const todo = document.createElement("div");
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
    todo.appendChild(eraseButton);
    todo.appendChild(completeButton);
    todoDiv.appendChild(todo);
}



