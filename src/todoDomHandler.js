import { projectsArray, getOpenProjectId } from "./data.js";
import { createElementTemplate } from "./helperFunctions.js";
import { showModal, closeModal } from "./modalHandler.js";
import { body, createProjectBtn, projectsDiv } from "./layout.js";

export function renderTodos(projectDiv){
    const matchingTodoCompactList = projectsDiv.querySelectorAll(".todos-compact-list")
    matchingTodoCompactList.forEach(elem => {
        elem.remove()
    })
    const todosCompactList = createElementTemplate("div", {class: "todos-compact-list"})
    projectDiv.append(todosCompactList)
    const matchingProject = projectsArray.find((project) => project.id === getOpenProjectId())
    if(matchingProject){
        matchingProject.todos.forEach(todo => {
        const todoCompact = createElementTemplate("div", {class: "todo-compact"})
        todosCompactList.append(todoCompact)
            for (const key in todo) {
                const p = createElementTemplate("p", {}, todo[key])
                p.innerText = todo[key]
                todoCompact.append(p)
            }
        });
    }
}