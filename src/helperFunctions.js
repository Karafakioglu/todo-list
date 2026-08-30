import {format} from "date-fns";

export function createRandomId(){
    return self.crypto.randomUUID()
}

export function getCurrentDate(){
    const date = new Date()
    const todaysDate = format(date, "dd/MM/yyyy");
    return todaysDate
}

export function createElementTemplate(elementType, attributes, text){
    const element = document.createElement(elementType)
    for (const key in attributes) {       
       element.setAttribute(key, attributes[key])
    }
    if(text){
        element.innerText = text
    }
    return element
}

