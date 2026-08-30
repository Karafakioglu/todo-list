import "./style.css";
import { projectsArray } from "./data.js";
import { createProject, editProject, deleteProject, getProjects } from "./projectHandler.js";
import { createTodo, deleteTodo, editTodo } from "./todoHandler.js";
import * as projectDomHandler from "./projectDomHandler.js"


//testing purposes to use them in console.
window.createProject = createProject;
window.deleteProject = deleteProject;
window.getProjects = getProjects;
window.editProject = editProject;

window.createTodo = createTodo;
window.deleteTodo = deleteTodo;
window.editTodo = editTodo;

