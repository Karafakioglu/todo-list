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

const mainDiv = createElementTemplate("div", null, "id", "main-div");

const sidebarDiv = createElementTemplate("div", null, "id", "sidebar-div")

const projectsDiv = createElementTemplate("div", null, "class", "projects-div")

const createProjectBtn = createElementTemplate("button", "Create a new project", "class", "create-project-btn")
createProjectBtn.addEventListener("click", createProjectDom)





body.append(sidebarDiv)
body.append(mainDiv)

mainDiv.append(projectsDiv)
mainDiv.append(createProjectBtn)

function renderProject(){
    projectsArray.forEach(element => {
        const todoCount = element.todos.length;

        const projectDiv = createElementTemplate("div", null, "class", "project-div")
        projectDiv.dataset.id = element.id
        projectDiv.dataset.creationDate = element.creationDate;

        const deleteProjectBtn = createElementTemplate("button", "Delete project")
        const editProjectBtn = createElementTemplate("button", "Edit project")
        const projectButtonsDiv = createElementTemplate("div", null, "class", "project-btns-div")
        const todoCountElement = createElementTemplate("div", `${todoCount} Todos in this project`)   

        for (const key in element) {
            if((key === "id") || (key === "todos")){
                continue
            }
            else{
                const projectDetailDiv = createElementTemplate("div", `${element[key]}`)
                projectDiv.append(projectDetailDiv)
            }
        }
        projectsDiv.append(projectDiv)
        projectDiv.append(todoCountElement);
        projectDiv.append(projectButtonsDiv)
        projectButtonsDiv.append(deleteProjectBtn);
        projectButtonsDiv.append(editProjectBtn);

        deleteProjectBtn.addEventListener("click", deleteProjectDom)
        
    });
}

function createElementTemplate(elementType, text, attributeType, attributeName ){
    const element = document.createElement(elementType);
    if(text){
        element.innerText = text
    }
    if(attributeName && attributeType){
        element.setAttribute(`${attributeType}`, `${attributeName}`)
    }
    return element
}



function createProjectDom(){
    createProject("DomTest", "DomTestDesc")
}

function deleteProjectDom(e){
    const relevantProjectId = e.target.closest(".project-div").dataset.id
    deleteProject(relevantProjectId)
}

renderProject()
