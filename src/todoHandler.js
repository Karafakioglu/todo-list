import { projectsArray } from "./data.js";
import * as helperFunctions from "./helperFunctions.js";

class Todo {
    constructor(title, description, dueDate, status, priority, notes){
        this.title = title;
        this.description = description;
        this.id = helperFunctions.createRandomId()
        this.dueDate = dueDate;
        this.status = status;
        this.priority = priority;
        this.notes = notes;
        this.creationDate = helperFunctions.getCurrentDate()
    }
}

export function createTodo(projectId, title, description, dueDate, status, priority, notes){
   const project = projectsArray.find((project) => project.id === projectId)
   if(!project){
    console.log("No project")
    return
    }
    else{
        console.log("Todo created")
        project.todos.push(new Todo(title, description, dueDate, status, priority, notes))
    }
}

export function deleteTodo(projectId, todoId){
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

export function editTodo(projectId, todoId, updates){
    const project = projectsArray.find((project) => project.id === projectId)
    const forbiddenKeys = ["id", "creationDate"]

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

const defaultTodo = new Todo("Default todo", "Default desc", "Default Date 20.05.1994", "Done", "Default Priority", "Default Notes")
const testTodo1 = new Todo("testTodo1", "testTodo1 desc", "testTodo1 Date 20.05.1994", "testTodo1 Done", "testTodo1 Priority", "testTodo1 Notes")

projectsArray[0].todos.push(defaultTodo)
projectsArray[0].todos.push(testTodo1)

projectsArray[1].todos.push(defaultTodo)
