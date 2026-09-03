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

export function createSelectField(name, labelText, options){
    const selectDiv = createElementTemplate("div", {class: `${name}-div`})

    const label = document.createElement("label")
    label.setAttribute("for", name)
    label.innerText = labelText

    const select = document.createElement("select");
    select.setAttribute("name", name)
    select.setAttribute("id", name)

    options.forEach(element => {
        const option = document.createElement("option")
        option.setAttribute("value", element)
        option.innerText = element.charAt(0).toUpperCase() + element.slice(1)
        select.append(option)
    });

    selectDiv.append(label, select)
    return selectDiv
}