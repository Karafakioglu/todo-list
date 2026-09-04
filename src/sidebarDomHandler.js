import { sidebarDiv, showTodosContainer } from "./layout.js";
import { renderAllTodos, renderDueTodos, renderUpcomingTodos, renderDoneTodos } from "./todoDomHandler.js";

sidebarDiv.addEventListener("click", (e) =>{
    if(e.target.closest("#all-todos-div")){
        // console.log("All todos")
        showTodosContainer()
        renderAllTodos()
    }
    else if(e.target.closest("#due-todos-div")){
        // console.log("Due todos")
        showTodosContainer()
        renderDueTodos()

    }else if(e.target.closest("#upcoming-todos-div")){
        // console.log("Upcoming todos")

        showTodosContainer()
        renderUpcomingTodos()

    }else if(e.target.closest("#finished-todos-div")){
        // console.log("Finished todos")

        showTodosContainer()
        renderDoneTodos()
    }

})
