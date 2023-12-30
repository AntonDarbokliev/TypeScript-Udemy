import { useContext } from "react"
import { Todo } from "./shared/interfaces/TodoInterfaces"
import { TodoContext } from "./contexts/TodosContext"

interface TodoItemProps {
    todo: Todo,
}


export const TodoItem: React.FC<TodoItemProps> = ({todo}) => {

    const { setTodos,todos } = useContext(TodoContext)

    function removeTodoHandler(){
        setTodos([...todos.filter(currentTodo => currentTodo.id !== todo.id)])
    }


    return (
        <li className="TodoItem">
            <div>
            <h5>{todo.text}</h5>
            <button onClick={removeTodoHandler} >X</button>
            </div>
        </li>
    )
} 