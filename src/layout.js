import { createElementTemplate } from "./helperFunctions.js"

export const body = document.querySelector("body")

export const mainDiv = createElementTemplate("div", {id: "main-div"})

const sidebarDiv = createElementTemplate("div", {id: "sidebar-div"})

export const projectsContainer = createElementTemplate("div", {class: "projects-container"})

export const projectsDiv = createElementTemplate("div", {class: "projects-div"})

export const createProjectBtn = createElementTemplate("button", {class: "create-project-btn"}, "Create a new project")

export const backToProjectBtn = createElementTemplate("button", {class: "back-to-project-btn"}, "Back")
export const deleteTodoBtn = createElementTemplate("button", {class: "delete-todo-btn"}, "Delete")
export const editTodoBtn = createElementTemplate("button", {class: "edit-todo-btn"}, "Edit")

export const todoContainer = createElementTemplate("div", {class: "todo-container"})

export const todoDiv = createElementTemplate("div", {class: "todo-div"})
todoContainer.style.display = "none"

body.append(sidebarDiv, mainDiv)
mainDiv.append(projectsContainer,todoContainer)
projectsContainer.append(projectsDiv,createProjectBtn)
todoContainer.append(todoDiv, backToProjectBtn, deleteTodoBtn,editTodoBtn)

export function showProjectsContainer(){
    projectsContainer.style.display = "block"
    todoContainer.style.display = "none"
}

export function showTodoContainer(){
    projectsContainer.style.display = "none"
    todoContainer.style.display = "block"
}