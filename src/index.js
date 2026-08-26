import "./style.css";

const projectsArray = []

class Project {
    constructor(title, description){
        this.title = title;
        this.description = description;
        this.id = createRandomId()
        this.todos = [];
    }
}

class Todo {
    constructor(title, description, dueDate, status, priority, notes){
        this.title = title;
        this.description = description;
        this.id = createRandomId()
        this.dueDate = dueDate;
        this.status = status;
        this.priority = priority;
        this.notes = notes;
    }
}

function createRandomId(){
    return self.crypto.randomUUID()
}

export function addProject(title, description){
    projectsArray.push(new Project(title, description))
}

function deleteProject(id){
    const index = projectsArray.findIndex((element) => element.id === id)
    projectsArray.splice(index,1)
}

export function displayProject(){
    console.table(projectsArray)
    projectsArray.forEach(element => {
        console.log(element.todos)
    });
}

//testing purposes to use them in console.
window.addProject = addProject;
window.deleteProject = deleteProject;
window.displayProject = displayProject;



const defaultTodo = new Todo("Default todo", "default desc", null, null, null)
const defaultProject = new Project("Default Project", "This is a default project");


projectsArray.push(defaultProject);
defaultProject.todos.push(defaultTodo)

const tempTodo = new Todo("x", null, null, null, null, null, null)
defaultProject.todos.push(tempTodo)

console.log(projectsArray)

