import { projectsArray, getOpenProjectId, saveProjects, setSectionToReturn, getSectionToReturn, setActiveFilter, getActiveFilter } from "./data.js";
import { createElementTemplate, createFormField, createSelectField, getCurrentDate } from "./helperFunctions.js";
import { showModal, closeModal } from "./modalHandler.js";
import { body, projectsDiv, mainDiv, todoDiv, todoContainer, showProjectsContainer, todosContainer, showTodoContainer, showTodosContainer } from "./layout.js";
import { Todo } from "./todoHandler.js";
import { refreshProjectView } from "./projectDomHandler.js";
import { differenceInDays, parse, startOfToday } from "date-fns";


body.append(createTodoModal("todo-edit-modal", editTodoDom), createTodoModal("todo-new-modal", createTodoDom))

function editTodoDom(e){
    const editTodoDom = document.getElementById("todo-edit-modal")
    const relevantTodoId = editTodoDom.dataset.id

    const titleInput = editTodoDom.querySelector("#title")
    const descInput = editTodoDom.querySelector("#description");
    const dueDateInput = editTodoDom.querySelector("#dueDate");
    const statusInput = editTodoDom.querySelector("#status");
    const priorityInput = editTodoDom.querySelector("#priority");
    const notesInput = editTodoDom.querySelector("#notes")
    // editTodo(getOpenProjectId(), relevantTodoId, {title: titleInput.value, description: descInput.value, dueDate: dueDateInput.value, status: statusInput.value, priority: priorityInput.value, notes: notesInput.value })
    returnSelectedTodoItem(relevantTodoId).editTodo({title: titleInput.value, description: descInput.value, dueDate: dueDateInput.value, status: statusInput.value, priority: priorityInput.value, notes: notesInput.value })

    closeModal("todo-edit-modal")
    saveProjects()
    renderTodo(relevantTodoId)
    refreshProjectView()
    renderConditionalTodos(getActiveFilter())

}

function createTodoDom(e){
    const createTodoDom = document.getElementById("todo-new-modal");
    const project = projectsArray.find((project) => project.id === getOpenProjectId())


    const titleInput = createTodoDom.querySelector("#title")
    const descInput = createTodoDom.querySelector("#description");
    const dueDateInput = createTodoDom.querySelector("#dueDate");
    const statusInput = createTodoDom.querySelector("#status");
    const priorityInput = createTodoDom.querySelector("#priority");
    const notesInput = createTodoDom.querySelector("#notes")
    project.createTodo(titleInput.value,descInput.value,dueDateInput.value,statusInput.value,priorityInput.value,notesInput.value)

    closeModal("todo-new-modal");
    saveProjects()
    refreshProjectView()
    renderConditionalTodos(getActiveFilter())
}


export function renderTodos(projectDiv){
    const matchingTodoCompactList = projectsDiv.querySelectorAll(".todos-compact-list")
    
    matchingTodoCompactList.forEach((elem) => {
        elem.remove()
    })
    const todosCompactList = createElementTemplate("div", {class: "todos-compact-list"})
    projectDiv.append(todosCompactList)
    const addTodoButton = createElementTemplate("button", {class: "add-todo-btn"}, "Add todo")
    todosCompactList.append(addTodoButton)
    const matchingProject = projectsArray.find((project) => project.id === getOpenProjectId())
    if(matchingProject){
        matchingProject.todos.forEach(todo => {
        const todoCompact = createElementTemplate("div", {class: "todo-compact", "data-todo-id": `${todo.id}`})
        todosCompactList.append(todoCompact)
        const todoTitle = createElementTemplate("p", {}, todo.title)
        const todoDesc = createElementTemplate("p", {}, todo.description)
        const todoCreationDate = createElementTemplate("p", {}, todo.creationDate)
        const todoPriority = createElementTemplate("p", {}, todo.priority)
        todoCompact.append(todoTitle, todoDesc, todoCreationDate,todoPriority)
        });
    }
}

export function renderTodo(selectedTodoId){
    todoDiv.innerHTML = ""
    todoDiv.dataset.todoId = selectedTodoId
    const selectedTodo = returnSelectedTodoItem(selectedTodoId)
        for (const key in selectedTodo) {
            if(key === "id"){
                continue
            }else{
                const todoInfo = createElementTemplate("p", {}, selectedTodo[key])
                todoDiv.append(todoInfo)
            }
        }
}

function createTodosCompact(todo){
    const todoDiv = createElementTemplate("div", {class: "todos-div-compact", "data-todo-id": `${todo.id}`})

    const todoTitle = createElementTemplate("p", {}, todo.title)
    const todoDesc = createElementTemplate("p", {}, todo.description)
    const todoCreationDate = createElementTemplate("p", {}, todo.creationDate)
    const dueDate = createElementTemplate("p", {}, todo.dueDate)
    const todoPriority = createElementTemplate("p", {}, todo.priority)
    
    todoDiv.append(todoTitle,todoDesc,todoCreationDate,dueDate,todoPriority)
    todosContainer.append(todoDiv)
}

function clearCompactTodo(){
    const matchingTodoCompactList = todosContainer.querySelectorAll(".todos-div-compact")

    matchingTodoCompactList.forEach((elem) => {
        elem.remove()
    })
}


export function renderConditionalTodos(isTodoCondition){
    setActiveFilter(isTodoCondition)
    clearCompactTodo()
    projectsArray.forEach(project =>{
        const projectTodos = project.todos

        projectTodos.forEach((todo) =>{
            if(isTodoCondition(todo)){
                createTodosCompact(todo)
            }
        })

    })
}

export function isDone(todo){
    return todo.status === "done"
}

export function isUpcoming(todo){
    const parsedTodoDate = parse(todo.dueDate, "yyyy-MM-dd", new Date())
    const dueDateDifferenceInDays = differenceInDays(parsedTodoDate,  startOfToday())

    return (dueDateDifferenceInDays > 0 && dueDateDifferenceInDays <= 7)
}

export function isDue(todo){
    const parsedTodoDate = parse(todo.dueDate, "yyyy-MM-dd", new Date())
    const dueDateDifferenceInDays = differenceInDays(parsedTodoDate,  startOfToday())
    console.log(dueDateDifferenceInDays)

    return (dueDateDifferenceInDays <= 0)
}

export function isAny(todo){
    return true
}

todoContainer.addEventListener("click", (e) => {
    if(e.target.closest(".back-to-project-btn")){
        getSectionToReturn()()
    }
    else if(e.target.closest(".delete-todo-btn")){
        const todoId = todoContainer.querySelector(".todo-div").dataset.todoId
        const project = returnSelectedProjectItem(todoId)

        project.deleteTodo(todoId)
        saveProjects()
        // showProjectsContainer()
        getSectionToReturn()()
        refreshProjectView()
        renderConditionalTodos(getActiveFilter())

    }
    else if(e.target.closest(".edit-todo-btn")){
        const todoId = todoContainer.querySelector(".todo-div").dataset.todoId
        populateTodoModal(todoId, "todo-edit-modal")
        showModal("todo-edit-modal")
    }
    
})

todosContainer.addEventListener("click", (e)=>{
    
    if(e.target.closest(".todos-div-compact")){
        const selectedTodoId = e.target.closest(".todos-div-compact").dataset.todoId
        renderTodo(selectedTodoId)
        showTodoContainer()
        setSectionToReturn(showTodosContainer)
    }else if(e.target.closest("#back-to-todos-btn")){
        showProjectsContainer()
    }
})



// function returnSelectedTodoItem(selectedTodoId){
    // const project = projectsArray.find((project) => project.id === getOpenProjectId())
    // const todo = project.todos.find((todo) => todo.id === selectedTodoId)
    // return todo
// }

function returnSelectedTodoItem(selectedTodoId){
    return projectsArray.flatMap(project => project.todos).find(todo => todo.id === selectedTodoId)
}

function returnSelectedProjectItem(selectedTodoId){
    return projectsArray.find(project => project.todos.some(todo => todo.id === selectedTodoId))
}

function createTodoModal(todoModalId, onConfirm){
    const todoModal = createElementTemplate("dialog", {id: todoModalId})
    const formElement = createElementTemplate("form", {action: "", method:"", class: "todo-form"})

    const todoFormTitleDiv = createFormField("title", "Title", "text", true)
    const todoFormDescDiv = createFormField("description", "Description", "text", true);
    const todoFormDueDateDiv = createFormField("dueDate", "Due Date", "date", false);
    const todoFormStatusDiv = createSelectField("status", "Select a status", ["done", "in-progress", "not-started"])
    const todoPriorityDiv = createSelectField("priority", "Select a priority", ["high", "medium", "low"])
    const todoNotesDiv = createFormField("notes", "Notes", "text", false);


    const closeTodoModalBtn = createElementTemplate("button" ,{type: "button"}, "Close")
    const confirmTodoModalBtn = createElementTemplate("button", {}, "Confirm")

    formElement.addEventListener("submit", (e) =>{
        e.preventDefault();
        onConfirm()
        formElement.reset()
    })
    closeTodoModalBtn.addEventListener("click", () =>{
        closeModal(todoModalId)
        formElement.reset()
    })

    todoModal.append(formElement)
    formElement.append(todoFormTitleDiv,todoFormDescDiv,todoFormDueDateDiv,todoFormStatusDiv,todoPriorityDiv,todoNotesDiv,closeTodoModalBtn,confirmTodoModalBtn)

    return todoModal
}

function populateTodoModal(selectedTodoId, modalType){
    const modal = document.getElementById(modalType);
    modal.dataset.id = selectedTodoId
    const matchingTodo = returnSelectedTodoItem(selectedTodoId)

    const titleInput = modal.querySelector("input[name='title']")
    titleInput.value = matchingTodo.title

    const descInput = modal.querySelector("input[name='description']")
    descInput.value = matchingTodo.description

    const dueDateInput = modal.querySelector("input[name='dueDate']")
    dueDateInput.value = matchingTodo.dueDate

    const statusInput = modal.querySelector("select[name='status']")
    statusInput.value = matchingTodo.status

    const priorityInput = modal.querySelector("select[name='priority']")
    priorityInput.value = matchingTodo.priority

    const notesInput = modal.querySelector("input[name='notes']")
    notesInput.value = matchingTodo.notes
}

