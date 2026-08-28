import "./style.css";
import {format} from "date-fns"




const projectsArray = []

class Project {
    constructor(title, description){
        this.title = title;
        this.description = description;
        this.id = createRandomId()
        this.todos = [];
        this.creationDate = dateHandle.getCurrentDate();
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
        this.creationDate = dateHandle.getCurrentDate()
    }
}

function createRandomId(){
    return self.crypto.randomUUID()
}

const dateHandle = function(){

    function getCurrentDate(){
        const date = new Date()
        const todaysDate = format(date, "dd/MM/yyyy");
        return todaysDate
    }
    return {getCurrentDate}
}()


function createProject(title, description){
    console.log("Created project")
    projectsArray.push(new Project(title, description, dateHandle.getCurrentDate()))
}

function deleteProject(id){
    const index = projectsArray.findIndex((element) => element.id === id)
    if(index !== -1){
        console.log(`Deleting project id with ${id}`)
        projectsArray.splice(index,1)
    }else{
        console.log("no project found")
    }
    
}

function getProjects(){
    if(projectsArray.length !== 0){
        console.table(projectsArray)
        projectsArray.forEach(element => {
            console.log(element.todos)
        });
    }else{
        console.log("No project!")
    }

    
}

function createTodo(title, description, dueDate, status, priority, notes, projectId){
   const project = projectsArray.find((project) => project.id === projectId)
   if(!project){
    console.log("No project")
    return
    }
    else{
        console.log("Todo created")
        project.todos.push(new Todo(title, description, dueDate, status, priority, notes, dateHandle.getCurrentDate()))
    }
}

function deleteTodo(todoId, projectId){
    const project = projectsArray.find((project) => project.id === projectId)
   
    if(!project){
        console.log("No project")
        return
    }else{
        const index = project.todos.findIndex((todo) => todo.id === todoId)
        if(index !== -1){
            console.log("deleting todo")
            project.todos.splice(index,1)
        }
        else{
            console.log("No todo")
        }
    }
}

// function editTodo(projectId, todoId, updates){
//     const forbiddenKeys = ["id", "creationDate"]
//     projectsArray.forEach(project =>{
//         if(project.id === projectId){
//             project.todos.forEach(todo => {
//                 if(todo.id === todoId){
//                     for (const updateKey in updates){
//                         if (forbiddenKeys.includes(updateKey)){
//                             continue
//                         }
//                         todo[updateKey] = updates[updateKey]
//                     }
//                 }
//             })
//         }
//     })
// }

function editTodo(projectId, todoId, updates){
    const project = projectsArray.find((project) => project.id === projectId)
    const forbiddenKeys = ["id", "creationDate", "projectId"]

   
    if(!project){
        console.log("No project")
        return
    }else{
        const index = project.todos.findIndex((todo) => todo.id === todoId)
        if(index !== -1){
            console.log("editing todo")
            for (const updateKey in updates){
                if(forbiddenKeys.includes(updateKey)){
                    continue
                }
                project.todos[index][updateKey] = updates[updateKey]
            }
        }
        else{
            console.log("No todo")
        }
    }
}

//testing purposes to use them in console.
window.createProject = createProject;
window.deleteProject = deleteProject;
window.getProjects = getProjects;

window.createTodo = createTodo;
window.deleteTodo = deleteTodo;
window.editTodo = editTodo;



const defaultTodo = new Todo("Default todo", "Default desc", "Default Date 20.05.1994", "Done", "Default Priority", "Default Notes")
const defaultProject = new Project("Default Project", "This is a default project");
const testTodo1 = new Todo("testTodo1", "testTodo1 desc", "testTodo1 Date 20.05.1994", "testTodo1 Done", "testTodo1 Priority", "testTodo1 Notes")


projectsArray.push(defaultProject);
defaultProject.todos.push(defaultTodo)
defaultProject.todos.push(testTodo1)

