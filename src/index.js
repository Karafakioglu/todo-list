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





body.append(sidebarDiv, mainDiv, createProjectEditModal())

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
        editProjectBtn.addEventListener("click", showModal)
        
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
    createProject("DomTest", "DomTestDesc")
}

function editProjectDom(e){
    const relevantProjectId = e.target.closest("#project-edit-modal").dataset.id

    const titleInput = document.getElementById("id")
    const descInput = document.getElementById("description");
    editProject(relevantProjectId, {title: titleInput.value, description: descInput.value})

    closeModal()
}

function createProjectEditModal(e){
    const editProjectModal = createElementTemplate("dialog", {id: "project-edit-modal"})
    const closeEditProjectModalBtn = createElementTemplate("button" ,{}, "Close")
    const confirmEditProjectModalBtn = createElementTemplate("button", {}, "Confirm")
    const formElement = createElementTemplate("form", {action: "", method:"", class: "edit-project-form"})
    const projectFormTitleDiv = createElementTemplate("div", {class: "project-edit-title-div"});
    const titleLabel = createElementTemplate("label", {for: "title"},"Project title:")
    const titleInput = createElementTemplate("input", {type: "text", name:"id", id:"id"})
    const projectFormDescDiv = createElementTemplate("div", {class: "project-edit-desc-div"});
    const descLabel = createElementTemplate("label", {for: "description"}, "Project description:")
    const descInput = createElementTemplate("input", {type: "text", name:"description", id: "description"})

    confirmEditProjectModalBtn.addEventListener("click", editProjectDom)
    closeEditProjectModalBtn.addEventListener("click", closeModal)


    editProjectModal.append(formElement,projectFormTitleDiv,projectFormDescDiv, closeEditProjectModalBtn, confirmEditProjectModalBtn)
    projectFormTitleDiv.append(titleLabel,titleInput)
    projectFormDescDiv.append(descLabel, descInput)

    
    return editProjectModal
}

function showModal(e){
    const modal = document.getElementById("project-edit-modal");
    const relevantProjectId = e.target.closest(".project-div").dataset.id
    modal.dataset.id = relevantProjectId
    let matchingProject = projectsArray.find((project) => project.id === relevantProjectId)

    const titleInput = document.getElementById("id")
    titleInput.value = matchingProject.title

    const descInput = document.getElementById("description");
    descInput.value = matchingProject.description

    modal.showModal()
}

function closeModal(){
    const modal = document.getElementById("project-edit-modal");
    delete modal.dataset.id
    modal.close()

}

function deleteProjectDom(e){
    const relevantProjectId = e.target.closest(".project-div").dataset.id
    deleteProject(relevantProjectId)
}

renderProject()
