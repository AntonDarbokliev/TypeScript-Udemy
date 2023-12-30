import React, { useContext, useRef } from "react";
import { Todo } from "./shared/interfaces/TodoInterfaces";
import { TodoContext } from "./contexts/TodosContext";

export const AddTodo: React.FC = () => {
    const { setTodos } = useContext(TodoContext);

    const textRef = useRef<HTMLInputElement>(null);

    function handleAddTodo(e: React.FormEvent<HTMLButtonElement>): void {
        e.preventDefault();
        const todo: Todo = {
            id: Math.random().toString(),
            text: textRef.current!.value,
        };
        
        setTodos((todos) => [...todos, todo]);

        textRef.current!.value = ''
    }

    return (
        <form>
            <div>
                <label htmlFor="todo-text">Todo text</label>
                <input type="text" id="todo-text" ref={textRef} />
            </div>
            <button onClick={handleAddTodo}>ADD TODO</button>
        </form>
    );
};
