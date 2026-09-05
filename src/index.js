import "./style.css";
import { projectsArray } from "./data.js";
import { Project } from "./projectHandler.js";
import * as projectDomHandler from "./projectDomHandler.js"
import * as sideBarDomHandler from "./sidebarDomHandler.js"
import { saveProjects, loadProjects } from "./data.js";



loadProjects("projects")
if(projectsArray.length === 0){
    const defaultProject = new Project("Default Project", "This is a default project");
    projectsArray.push(defaultProject);
    saveProjects()
}
projectDomHandler.renderProject()


