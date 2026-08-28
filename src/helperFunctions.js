import {format} from "date-fns"

export function createRandomId(){
    return self.crypto.randomUUID()
}

export function getCurrentDate(){
    const date = new Date()
    const todaysDate = format(date, "dd/MM/yyyy");
    return todaysDate
}


