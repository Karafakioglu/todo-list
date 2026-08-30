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

createProjectBtn.addEventListener("click", () =>{
    showModal("project-new-modal")
})


body.append(sidebarDiv, mainDiv, createProjectModal("project-edit-modal", editProjectDom), createProjectModal("project-new-modal", createProjectDom))
mainDiv.append(projectsDiv,createProjectBtn)

function renderProject(){
    projectsArray.forEach(element => {
        const todoCount = element.todos.length;

        const projectDiv = createElementTemplate("div", {class: "project-div"})
        projectDiv.dataset.id = element.id
        projectDiv.dataset.creationDate = element.creationDate;

        const deleteProjectBtn = createElementTemplate("button", {class: "delete-project-btn"}, "Delete project")
        const editProjectBtn = createElementTemplate("button", {}, "Edit project");

        const projectButtonsDiv = createElementTemplate("div", {class: "project-btns-div"})
        const todoCountElement = createElementTemplate("div", {class: "todo-count"}, `${todoCount} Todos in this project`)   

        for (const key in element) {
            if((key === "id") || (key === "todos")){
                continue
            }
            else{
                const projectDetailDiv = createElementTemplate("div", {}, `${element[key]}`)
                projectDiv.append(projectDetailDiv)
            }
        }
        projectsDiv.append(projectDiv)
        projectDiv.append(todoCountElement, projectButtonsDiv)
        projectButtonsDiv.append(deleteProjectBtn,editProjectBtn);

        deleteProjectBtn.addEventListener("click", deleteProjectDom)
        editProjectBtn.addEventListener("click", (e) =>{
            populateModal(e, "project-edit-modal")
            showModal("project-edit-modal")
            
        })
        
    });
}

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
    const createProjectDom = document.getElementById("project-new-modal")
    const titleInput = createProjectDom.querySelector("#id")
    const descInput = createProjectDom.querySelector("#description");
    
    createProject(titleInput.value, descInput.value)

    closeModal("project-new-modal")
}

function editProjectDom(e){
    const editProjectDom = document.getElementById("project-edit-modal")
    const relevantProjectId = editProjectDom.dataset.id

    const titleInput = editProjectDom.querySelector("#id")
    const descInput = editProjectDom.querySelector("#description");
    editProject(relevantProjectId, {title: titleInput.value, description: descInput.value})

    closeModal("project-edit-modal")
}

function createProjectModal(projectModalId, onConfirm){
    const projectModal = createElementTemplate("dialog", {id: projectModalId})

    const formElement = createElementTemplate("form", {action: "", method:"", class: "project-form"})

    const projectFormTitleDiv = createElementTemplate("div", {class: "project-title-div"});
    const titleLabel = createElementTemplate("label", {for: "title"},"Project title:")
    const titleInput = createElementTemplate("input", {type: "text", name:"id", id:"id"})
    titleInput.required = true

    const projectFormDescDiv = createElementTemplate("div", {class: "project-desc-div"});
    const descLabel = createElementTemplate("label", {for: "description"}, "Project description:")
    const descInput = createElementTemplate("input", {type: "text", name:"description", id: "description"})
    descInput.required = true

    const closeProjectModalBtn = createElementTemplate("button" ,{type: "button"}, "Close")
    const confirmProjectModalBtn = createElementTemplate("button", {}, "Confirm")

    formElement.addEventListener("submit", (e) =>{
        e.preventDefault();
        onConfirm()
        formElement.reset()
    })
    closeProjectModalBtn.addEventListener("click", () =>{
        closeModal(projectModalId)
        formElement.reset()
    })


    projectModal.append(formElement)
    projectFormTitleDiv.append(titleLabel,titleInput)
    projectFormDescDiv.append(descLabel, descInput)
    formElement.append(projectFormTitleDiv,projectFormDescDiv,closeProjectModalBtn,confirmProjectModalBtn)


    
    return projectModal
}

function showModal(modalType){
    const modal = document.getElementById(modalType);
    modal.showModal()
}

function populateModal(e, modalType){
    const modal = document.getElementById(modalType);
    const relevantProjectId = e.target.closest(".project-div").dataset.id
    modal.dataset.id = relevantProjectId
    let matchingProject = projectsArray.find((project) => project.id === relevantProjectId)

    const titleInput = modal.querySelector("input[name='id']")
    titleInput.value = matchingProject.title

    const descInput = modal.querySelector("input[name='description']")
    descInput.value = matchingProject.description
}

function closeModal(modalType){
    const modal = document.getElementById(modalType);
    delete modal.dataset.id
    modal.close()
}

function deleteProjectDom(e){
    const relevantProjectId = e.target.closest(".project-div").dataset.id
    deleteProject(relevantProjectId)
}

renderProject()