import { createElementTemplate } from "./helperFunctions.js"

//Main Div part

export const body = document.querySelector("body")

export const mainDiv = createElementTemplate("div", {id: "main-div"})

export const projectsContainer = createElementTemplate("div", {class: "projects-container"})

export const projectsDiv = createElementTemplate("div", {class: "projects-div"})

export const createProjectBtn = createElementTemplate("button", {class: "create-project-btn"}, "Create a new project")

export const backToProjectBtn = createElementTemplate("button", {class: "back-to-project-btn"}, "Back")
export const deleteTodoBtn = createElementTemplate("button", {class: "delete-todo-btn"}, "Delete")
export const editTodoBtn = createElementTemplate("button", {class: "edit-todo-btn"}, "Edit")

export const todoContainer = createElementTemplate("div", {class: "todo-container"})

export const todoDiv = createElementTemplate("div", {class: "todo-div"})
todoContainer.style.display = "none"

//Side Div part

export const sidebarDiv = createElementTemplate("div", {id: "sidebar-div"});

export const todosContainer = createElementTemplate("div", {id: "todos-container-div"})


const backToTodosBtn = createElementTemplate("button", {id: "back-to-todos-btn"}, "Back")
todosContainer.style.display = "none"

const allTodos = createElementTemplate("div", {id: "all-todos-div"}, "All Todos");
const dueTodos = createElementTemplate("div", {id: "due-todos-div"}, "Due Todos");
const upcomingTodos = createElementTemplate("div", {id: "upcoming-todos-div"}, "Upcoming Todos");
const finishedTodos = createElementTemplate("div", {id: "finished-todos-div"}, "Finished Todos");


//Appending part

body.append(sidebarDiv, mainDiv)
mainDiv.append(projectsContainer,todoContainer,todosContainer )
projectsContainer.append(projectsDiv,createProjectBtn)
todoContainer.append(todoDiv, backToProjectBtn, deleteTodoBtn,editTodoBtn)


sidebarDiv.append(allTodos,dueTodos,upcomingTodos,finishedTodos)
todosContainer.append(backToTodosBtn)

export function showProjectsContainer(){
    projectsContainer.style.display = "block"
    todoContainer.style.display = "none"
    todosContainer.style.display = "none"
}

export function showTodoContainer(){
    projectsContainer.style.display = "none"
    todoContainer.style.display = "block"
    todosContainer.style.display = "none"
}

export function showTodosContainer(){
    projectsContainer.style.display = "none"
    todoContainer.style.display = "none"
    todosContainer.style.display = "block"
}