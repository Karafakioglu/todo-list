import { createElementTemplate } from "./helperFunctions.js"

export const body = document.querySelector("body")

const mainDiv = createElementTemplate("div", {id: "main-div"})

const sidebarDiv = createElementTemplate("div", {id: "sidebar-div"})

export const projectsDiv = createElementTemplate("div", {class: "projects-div"})

export const createProjectBtn = createElementTemplate("button", {class: "create-project-btn"}, "Create a new project")

body.append(sidebarDiv, mainDiv)
mainDiv.append(projectsDiv,createProjectBtn)