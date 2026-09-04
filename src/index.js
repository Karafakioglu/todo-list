import "./style.css";
import { projectsArray } from "./data.js";
import { createProject, editProject, deleteProject, getProjects, Project } from "./projectHandler.js";
import { Todo } from "./todoHandler.js";
import * as projectDomHandler from "./projectDomHandler.js"
import { getOpenProjectId } from "./data.js";
import { saveProjects, loadProjects } from "./data.js";
import * as sidebarDomHandler from "./sidebarDomHandler.js"
import { differenceInDays, parse, startOfDay } from "date-fns";
import { getCurrentDate } from "./helperFunctions.js";


//testing purposes to use them in console.
// window.createProject = createProject;
// window.deleteProject = deleteProject;
window.getProjects = getProjects;
// window.editProject = editProject;

// window.createTodo = createTodo;
// window.deleteTodo = deleteTodo;
// window.editTodo = editTodo;
// window.getOpenProjectId = getOpenProjectId
window.saveProjects = saveProjects;

// const defaultProject = new Project("Default Project", "This is a default project");
// const secondProject = new Project("Some title", "Some description")

// projectsArray.push(defaultProject);
// projectsArray.push(secondProject)

// const defaultTodo = new Todo("Default todo", "Default desc", "Default Date 20.05.1994", "Done", "Default Priority", "Default Notes")
// const testTodo1 = new Todo("testTodo1", "testTodo1 desc", "testTodo1 Date 20.05.1994", "testTodo1 Done", "testTodo1 Priority", "testTodo1 Notes")

// const secondProjectTodo1 = new Todo("Second Project Todo Title", "Second Project Todo desc", "Default Date 20.05.1994", "in progress", "Some priority", "default notes")

// projectsArray[0].todos.push(defaultTodo)
// projectsArray[0].todos.push(testTodo1)

// projectsArray[1].todos.push(secondProjectTodo1)

loadProjects("projects")
if(projectsArray.length === 0){
    const defaultProject = new Project("Default Project", "This is a default project");
    projectsArray.push(defaultProject);
    saveProjects()
}
projectDomHandler.renderProject()

// let todoDueDateString = projectsArray[0].todos[0].dueDate
// let todoCreationDateString = projectsArray[0].todos[0].creationDate
// let projectCreationDateString = projectsArray[0].creationDate

// let todoDueDate = parse(todoDueDateString, 'yyyy-MM-dd' ,new Date())
// let todoCreationDate = parse(todoCreationDateString, 'dd/MM/yyyy', new Date())
// let projectCreationDate = parse(projectCreationDateString, 'dd/MM/yyyy', new Date())

// console.log(todoDueDateString)
// console.log(todoCreationDateString)
// console.log(projectCreationDateString)

// console.log("------------")

// console.log(todoDueDate)
// console.log(todoCreationDate)
// console.log(projectCreationDate)

// console.log(differenceInDays(todoDueDate, projectCreationDate))


