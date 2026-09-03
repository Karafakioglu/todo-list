import { sidebarDiv, showTodosContainer } from "./layout.js";
import { renderAllTodos } from "./todoDomHandler.js";

sidebarDiv.addEventListener("click", (e) =>{
    if(e.target.closest("#all-todos-div")){
        // console.log("All todos")
        showTodosContainer()
        renderAllTodos()
    }
    else if(e.target.closest("#due-todos-div")){
        console.log("Due todos")
    }else if(e.target.closest("#upcoming-todos-div")){
        console.log("Upcoming todos")
    }else if(e.target.closest("#finished-todos-div")){
        console.log("Finished todos")
    }

})
