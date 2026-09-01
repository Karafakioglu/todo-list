export const projectsArray = []
import { Todo } from "./todoHandler.js";
import { Project } from "./projectHandler.js";

let openProjectId = null;

export function getOpenProjectId(){
    return openProjectId
}

export function setOpenProjectId(id){
    openProjectId = id
}

export function saveProjects(){
    localStorage.setItem("projects", JSON.stringify(projectsArray))
}

export function loadProjects(key){
    if(localStorage.getItem(key)){
        projectsArray.length = 0
        
        const returnedProjectsArray = JSON.parse(localStorage.getItem(key));
        returnedProjectsArray.forEach(project => {
            const newProject = new Project(project.title, project.description, project.id, project.creationDate)

            project.todos.forEach(todo => {
                const newTodo = new Todo(todo.title, todo.description, todo.dueDate, todo.status, todo.priority, todo.notes, todo.id, todo.creationDate)
                newProject.todos.push(newTodo)
            });
            
            projectsArray.push(newProject);
        });
    }else{
        console.log("No localstorage key found")
    }
}