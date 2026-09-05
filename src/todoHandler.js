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
