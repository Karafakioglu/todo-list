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

const mainDiv = createElementTemplate("div", {id: "main-div"})

const sidebarDiv = createElementTemplate("div", {id: "sidebar-div"})

const projectsDiv = createElementTemplate("div", {class: "projects-div"})

const createProjectBtn = createElementTemplate("button", {class: "create-project-btn"}, "Create a new project")
createProjectBtn.addEventListener("click", createProjectDom)





body.append(sidebarDiv)
body.append(mainDiv)

mainDiv.append(projectsDiv)
mainDiv.append(createProjectBtn)

function renderProject(){
    projectsArray.forEach(element => {
        const todoCount = element.todos.length;

        const projectDiv = createElementTemplate("div", {class: "project-div"})
        projectDiv.dataset.id = element.id
        projectDiv.dataset.creationDate = element.creationDate;

        const deleteProjectBtn = createElementTemplate("button", {class: "delete-project-btn"}, "Delete project")
        const editProjectBtn = createElementTemplate("button", {command: "show-modal", commandfor: "project-edit-modal"}, "Edit project");
        const projectButtonsDiv = createElementTemplate("div", {class: "project-btns-div"})
        const todoCountElement = createElementTemplate("div", {class: "todo-count"}, `${todoCount} Todos in this project`)   

        for (const key in element) {
            if((key === "id") || (key === "todos")){
                continue
            }
            else{
                // const projectDetailDiv = createElementTemplate("div", `${element[key]}`)
                const projectDetailDiv = createElementTemplate("div", {}, `${element[key]}`)
                projectDiv.append(projectDetailDiv)
            }
        }
        projectsDiv.append(projectDiv)
        projectDiv.append(todoCountElement);
        projectDiv.append(projectButtonsDiv)
        projectButtonsDiv.append(deleteProjectBtn);
        projectButtonsDiv.append(editProjectBtn);

        deleteProjectBtn.addEventListener("click", deleteProjectDom)
        editProjectBtn.addEventListener("click", editProjectDom)
        
    });
}

// function createElementTemplate(elementType, text, attributeType, attributeName ){
//     const element = document.createElement(elementType);
//     if(text){
//         element.innerText = text
//     }
//     if(attributeName && attributeType){
//         element.setAttribute(`${attributeType}`, `${attributeName}`)
//     }
//     return element
// }

function createElementTemplate(elementType, attributes, text){
    const element = document.createElement(elementType)
    for (const key in attributes) {       
       element.setAttribute(key, attributes[key])
    }
    if(text){
        element.innerText = text
    }
    return element
}


function createProjectDom(){
    createProject("DomTest", "DomTestDesc")
}

function editProjectDom(e){
    const relevantProjectId = e.target.closest(".project-div").dataset.id
    console.log(relevantProjectId)
}

function createProjectEditModal(){
    const dialog = createElementTemplate("dialog", {id:"project-edit-modal", closedby: "any"})
    
    const modalMainDiv = createElementTemplate("div", {})
    const form = createElementTemplate("form", {})

    body.append(dialog)
    dialog.append(modalMainDiv)
}

function deleteProjectDom(e){
    const relevantProjectId = e.target.closest(".project-div").dataset.id
    deleteProject(relevantProjectId)
}

renderProject()
createProjectEditModal()
