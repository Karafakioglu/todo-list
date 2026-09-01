import { projectsArray } from "./data.js";
import * as helperFunctions from "./helperFunctions.js";

export class Todo {
    constructor(title, description, dueDate, status, priority, notes, id = helperFunctions.createRandomId(), creationDate = helperFunctions.getCurrentDate()){
        this.title = title;
        this.description = description;
        this.id = id
        this.dueDate = dueDate;
        this.status = status;
        this.priority = priority;
        this.notes = notes;
        this.creationDate = creationDate
    }

    editTodo(updates){
        const forbiddenKeys = ["id", "creationDate"]
        console.log("editing todo")
        for (const updateKey in updates){
            if(forbiddenKeys.includes(updateKey)){
                continue
            }
            this[updateKey] = updates[updateKey]
        }
    }
}

// export function createTodo(projectId, title, description, dueDate, status, priority, notes){
//    const project = projectsArray.find((project) => project.id === projectId)
//    if(!project){
//     console.log("No project")
//     return
//     }
//     else{
//         console.log("Todo created")
//         project.todos.push(new Todo(title, description, dueDate, status, priority, notes))
//     }
// }

// export function deleteTodo(projectId, todoId){
//     const project = projectsArray.find((project) => project.id === projectId)
   
//     if(!project){
//         console.log("No project")
//         return
//     }else{
//         const index = project.todos.findIndex((todo) => todo.id === todoId)
//         if(index !== -1){
//             console.log("deleting todo")
//             project.todos.splice(index,1)
//         }
//         else{
//             console.log("No todo")
//         }
//     }
// }

// export function editTodo(projectId, todoId, updates){
//     const project = projectsArray.find((project) => project.id === projectId)
//     const forbiddenKeys = ["id", "creationDate"]

//     if(!project){
//         console.log("No project")
//         return
//     }else{
//         const index = project.todos.findIndex((todo) => todo.id === todoId)
//         if(index !== -1){
//             console.log("editing todo")
//             for (const updateKey in updates){
//                 if(forbiddenKeys.includes(updateKey)){
//                     continue
//                 }
//                 project.todos[index][updateKey] = updates[updateKey]
//             }
//         }
//         else{
//             console.log("No todo")
//         }
//     }
// }

