import React, { useRef } from "react"
import { Todo } from "./shared/interfaces/TodoInterfaces"

interface AddTodoProps {
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

export const AddTodo:React.FC<AddTodoProps> = (props) => {

    const textRef = useRef<HTMLInputElement>(null)

    function handleAddTodo(e:React.FormEvent<HTMLButtonElement>):void {
        e.preventDefault()
        const todo:Todo = {
            id: Math.random().toString(),
            text: textRef.current!.value
        }

        props.setTodos(todos => [...todos,todo])
        
    }

    return (
        <form action="">
            <div>
            <label htmlFor="todo-text">Todo text</label>
            <input type="text" id="todo-text" ref={textRef}/>
            </div>
            <button onClick={handleAddTodo} >ADD TODO</button>
        </form>
    )
}