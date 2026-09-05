import { sidebarDiv, showTodosContainer } from "./layout.js";
import { isDone, isDue, isUpcoming, isAny, renderConditionalTodos } from "./todoDomHandler.js";

sidebarDiv.addEventListener("click", (e) =>{
    if(e.target.closest("#all-todos-div")){
        showTodosContainer()
        // renderAllTodos()
        renderConditionalTodos(isAny)
        console.log(e.target)
    }
    else if(e.target.closest("#due-todos-div")){
        showTodosContainer()
        // renderDueTodos()
        renderConditionalTodos(isDue)

    }else if(e.target.closest("#upcoming-todos-div")){
        showTodosContainer()
        // renderUpcomingTodos()
        renderConditionalTodos(isUpcoming)

    }else if(e.target.closest("#finished-todos-div")){
        showTodosContainer()
        // renderDoneTodos()
        renderConditionalTodos(isDone)
    }

})
