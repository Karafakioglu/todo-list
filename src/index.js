import "./style.css";
import { projectsArray } from "./data.js";
import { createProject, editProject, deleteProject, getProjects } from "./projectHandler.js";
import { createTodo, deleteTodo, editTodo } from "./todoHandler.js";


//testing purposes to use them in console.
window.createProject = createProject;
window.deleteProject = deleteProject;
window.getProjects = getProjects;
window.editProject = editProject;

window.createTodo = createTodo;
window.deleteTodo = deleteTodo;
window.editTodo = editTodo;

const body = document.querySelector("body")

const mainDiv = document.createElement("div");
mainDiv.setAttribute("id", "main-div");

const sidebarDiv = document.createElement("div")
sidebarDiv.setAttribute("id", "sidebar-div")


body.append(sidebarDiv)
body.append(mainDiv)


