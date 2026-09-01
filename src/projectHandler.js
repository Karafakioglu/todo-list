import { projectsArray } from "./data.js";
import * as helperFunctions from "./helperFunctions.js";
import { Todo } from "./todoHandler.js";

export class Project {
    constructor(title, description){
        this.title = title;
        this.description = description;
        this.id = helperFunctions.createRandomId()
        this.todos = [];
        this.creationDate = helperFunctions.getCurrentDate();
    }

    deleteTodo(todoId){
        const index = this.todos.findIndex((todo) => todo.id === todoId)
        if(index !== -1){
            console.log("deleting todo")
            this.todos.splice(index,1)
        }
        else{
            console.log("No todo")
        }
    }

    createTodo(title, description, dueDate, status, priority, notes){
        this.todos.push(new Todo(title, description, dueDate, status, priority, notes))
    }

    editProject(updates){
        const forbiddenKeys = ["id", "creationDate", "todos"]
        for (const updateKey in updates){
                if(forbiddenKeys.includes(updateKey)){
                    continue
                }
                this[updateKey] = updates[updateKey]
            }
        }
}

export function createProject(title, description){
    console.log("Created project")
    projectsArray.push(new Project(title, description))
}

// export function editProject(projectId, updates){
//     const forbiddenKeys = ["id", "creationDate", "todos"]
//     const project = projectsArray.find((project) => project.id === projectId)

//     if(!project){
//         console.log("No project")
//         return
//     }else{
//         for (const updateKey in updates){
//             if(forbiddenKeys.includes(updateKey)){
//                 continue
//             }
//             project[updateKey] = updates[updateKey]
//         }
//     }
// }

export function deleteProject(projectId){
    const index = projectsArray.findIndex((element) => element.id === projectId)
    if(index !== -1){
        console.log(`Deleting project id with ${projectId}`)
        projectsArray.splice(index,1)
    }else{
        console.log("no project found")
    }
    
}

export function getProjects(){
    if(projectsArray.length !== 0){
        console.table(projectsArray)
        projectsArray.forEach(element => {
            console.log(element.todos)
        });
    }else{
        console.log("No project!")
    }
}
