import { projectsArray, saveProjects, setSectionToReturn } from "./data.js";
import { createProject, deleteProject } from "./projectHandler.js";
import { createElementTemplate } from "./helperFunctions.js";
import { showModal, closeModal } from "./modalHandler.js";
import { body, createProjectBtn, projectsDiv, showTodoContainer, showProjectsContainer} from "./layout.js";
import { getOpenProjectId, setOpenProjectId } from "./data.js";
import { renderTodos, renderTodo } from "./todoDomHandler.js";

createProjectBtn.addEventListener("click", () =>{
    showModal("project-new-modal")
})

body.append(createProjectModal("project-edit-modal", editProjectDom), createProjectModal("project-new-modal", createProjectDom))

projectsDiv.addEventListener("click", (e) => {
    if(e.target.closest(".edit-project-btn")) {
        populateModal(e, "project-edit-modal")
        showModal("project-edit-modal")
    }
    else if(e.target.closest(".delete-project-btn")) {
        deleteProjectDom(e)
        setOpenProjectId(null)

    }
    else if(e.target.closest(".add-todo-btn")){
        showModal("todo-new-modal")
    }
    else if(e.target.closest(".todo-compact")) {
        const todoCompact = e.target.closest(".todo-compact")
        const selectedCompactTodoId = todoCompact.dataset.todoId

        renderTodo(selectedCompactTodoId)
        showTodoContainer()
        setSectionToReturn(showProjectsContainer)

    }
    else if(e.target.closest(".project-div")) {
        const project = e.target.closest(".project-div")


        if(project.dataset.id === getOpenProjectId()) {
            project.querySelector(".todos-compact-list").remove()
            setOpenProjectId(null)
        } else{
            setOpenProjectId(project.dataset.id)
            renderTodos(project)
        }
    }
})


export function renderProject(){
    projectsDiv.innerHTML = ""
    projectsArray.forEach(element => {
        const todoCount = element.todos.length;

        const projectDiv = createElementTemplate("div", {class: "project-div"})
        projectDiv.dataset.id = element.id
        projectDiv.dataset.creationDate = element.creationDate;

        const deleteProjectBtn = createElementTemplate("button", {class: "delete-project-btn"}, "Delete project")
        const editProjectBtn = createElementTemplate("button", {class: "edit-project-btn"}, "Edit project");

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
        
    });
}

function createProjectDom(){
    const createProjectDom = document.getElementById("project-new-modal")
    const titleInput = createProjectDom.querySelector("#id")
    const descInput = createProjectDom.querySelector("#description");
    
    createProject(titleInput.value, descInput.value)
    closeModal("project-new-modal")
    saveProjects()
    renderProject()
}

function editProjectDom(e){
    
    const editProjectDom = document.getElementById("project-edit-modal")
    const project = projectsArray.find((project) => project.id === editProjectDom.dataset.id)

    const titleInput = editProjectDom.querySelector("#id")
    const descInput = editProjectDom.querySelector("#description");
    project.editProject({title: titleInput.value, description: descInput.value})

    closeModal("project-edit-modal")
    saveProjects()
    refreshProjectView()
    
}

export function refreshProjectView(){
    renderProject()
    const openId = getOpenProjectId()
    if(openId){
        const div = projectsDiv.querySelector(`[data-id="${openId}"]`)
        renderTodos(div)
    }
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



function deleteProjectDom(e){
    const relevantProjectId = e.target.closest(".project-div").dataset.id
    deleteProject(relevantProjectId)
    saveProjects()
    renderProject()
}
