import { projectsArray, getOpenProjectId } from "./data.js";
import { createElementTemplate } from "./helperFunctions.js";
import { showModal, closeModal } from "./modalHandler.js";
import { body, createProjectBtn, projectsDiv, mainDiv, todoDiv, projectsContainer, todoContainer, showProjectsContainer } from "./layout.js";
import { deleteTodo } from "./todoHandler.js";
import { refreshProjectView } from "./projectDomHandler.js";

export function renderTodos(projectDiv){
    const matchingTodoCompactList = projectsDiv.querySelectorAll(".todos-compact-list")
    matchingTodoCompactList.forEach(elem => {
        elem.remove()
    })
    const todosCompactList = createElementTemplate("div", {class: "todos-compact-list"})
    projectDiv.append(todosCompactList)
    const matchingProject = projectsArray.find((project) => project.id === getOpenProjectId())
    if(matchingProject){
        matchingProject.todos.forEach(todo => {
        const todoCompact = createElementTemplate("div", {class: "todo-compact", "data-todo-id": `${todo.id}`})
        todosCompactList.append(todoCompact)
        const todoTitle = createElementTemplate("p", {}, todo.title)
        const todoDesc = createElementTemplate("p", {}, todo.description)
        const todoCreationDate = createElementTemplate("p", {}, todo.creationDate)
        const todoPriority = createElementTemplate("p", {}, todo.priority)
        todoCompact.append(todoTitle, todoDesc, todoCreationDate,todoPriority)
        });
    }
}

export function renderTodo(selectedTodoId){
    todoDiv.innerHTML = ""
    todoDiv.dataset.todoId = selectedTodoId
    const selectedTodo = returnSelectedTodoItem(selectedTodoId)
        for (const key in selectedTodo) {
            if(key === "id"){
                continue
            }else{
                const todoInfo = createElementTemplate("p", {}, selectedTodo[key])
                todoDiv.append(todoInfo)
            }
        }
}

todoContainer.addEventListener("click", (e) => {
    if(e.target.closest(".back-to-project-btn")){
        showProjectsContainer()
    }
    else if(e.target.closest(".delete-todo-btn")){
        const todoId = todoContainer.querySelector(".todo-div").dataset.todoId
        deleteTodo(getOpenProjectId(), todoId)
        showProjectsContainer()
        refreshProjectView()

    }
})

function returnSelectedTodoItem(selectedTodoId){
    const project = projectsArray.find((project) => project.id === getOpenProjectId())
    const todo = project.todos.find((todo) => todo.id === selectedTodoId)
    return todo
}