import "./style.css";
import { projectsArray } from "./data.js";
import { createProject, editProject, deleteProject, getProjects, Project } from "./projectHandler.js";
import { Todo } from "./todoHandler.js";
import * as projectDomHandler from "./projectDomHandler.js"
import { getOpenProjectId } from "./data.js";


//testing purposes to use them in console.
// window.createProject = createProject;
// window.deleteProject = deleteProject;
// window.getProjects = getProjects;
// window.editProject = editProject;

// window.createTodo = createTodo;
// window.deleteTodo = deleteTodo;
// window.editTodo = editTodo;
// window.getOpenProjectId = getOpenProjectId

const defaultProject = new Project("Default Project", "This is a default project");
const secondProject = new Project("Some title", "Some description")

projectsArray.push(defaultProject);
projectsArray.push(secondProject)

const defaultTodo = new Todo("Default todo", "Default desc", "Default Date 20.05.1994", "Done", "Default Priority", "Default Notes")
const testTodo1 = new Todo("testTodo1", "testTodo1 desc", "testTodo1 Date 20.05.1994", "testTodo1 Done", "testTodo1 Priority", "testTodo1 Notes")

const secondProjectTodo1 = new Todo("Second Project Todo Title", "Second Project Todo desc", "Default Date 20.05.1994", "in progress", "Some priority", "default notes")

projectsArray[0].todos.push(defaultTodo)
projectsArray[0].todos.push(testTodo1)

projectsArray[1].todos.push(secondProjectTodo1)

projectDomHandler.renderProject()