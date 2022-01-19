const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUl = document.getElementById("todos");

const todos = JSON.parse(localStorage.getItem("todos"));

if(todos){
    todos.forEach(todo => addTodo(todo));
}

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    addTodo();
})

function addTodo(todo){
  
    let todoText = input.value;

    if(todo){
        todoText = todo.text;
    }

    if(todoText){
        const todoEl = document.createElement("li");

        if(todoEl.isCompleted && todo){
            todoEl.classList.add("completed")
        }
        todoEl.innerText= todoText;

        todoEl.addEventListener("click",()=>{
            todoEl.classList.toggle("completed")
            updateLS()
        })

        todoEl.addEventListener("contextmenu",(e)=>{
            e.preventDefault();
            todoEl.remove();
            updateLS();
        })   
        
        todosUl.appendChild(todoEl);
        input.value="";
    }

}

function updateLS(){
    const todosEls = document.querySelectorAll("li");

    const todosArray = [];

    todosEls.forEach(todoEl =>{
        todosArray.push({
            text: todoEl.innerText,
            isCompleted: todoEl.classList.contains("completed")
        })
    })

    localStorage.setItem("todos", JSON.stringify(todosArray))
}

