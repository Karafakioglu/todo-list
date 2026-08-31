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

export function createFormField(name, labelText, type, isRequired){
    const formTitle = createElementTemplate("div", {class: `${name}-div`});
    const label = createElementTemplate("label", {for: name},`${labelText}:`)
    const input = createElementTemplate("input", {type: type, name: name, id:name})
    input.required = isRequired

    formTitle.append(label,input)
    return formTitle
}