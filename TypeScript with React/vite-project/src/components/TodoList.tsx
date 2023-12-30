import { useContext } from "react"
import { TodoItem } from "./TodoItem"
import { TodoContext } from "./contexts/TodosContext"

// interface TodoListProps {
//     items:{id:string, text:string}[]
// }


export const TodoList = () => {
  const {todos} = useContext(TodoContext)

    return(
        <>
        {todos.map(item => <TodoItem todo={item} key={item.id} />)}
        </>
    )
}