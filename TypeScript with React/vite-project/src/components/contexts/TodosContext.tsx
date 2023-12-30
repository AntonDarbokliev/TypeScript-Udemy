import { ReactNode, createContext, useState } from "react";
import { Todo } from "../shared/interfaces/TodoInterfaces";
 
interface TodoContextValue {
    todos:Todo[],
    setTodos:React.Dispatch<React.SetStateAction<Todo[]>>
}

interface TodoContextProps {
    children: ReactNode
}

export const TodoContext = createContext<TodoContextValue>({
    todos: [],
    setTodos: () => {}
})


export const TodoContextProvider:React.FC<TodoContextProps> = ({children}) => {

  const [todos,setTodos] = useState<Todo[]>([])

  const contextValues = {
    todos,
    setTodos
  }

  return (
    <TodoContext.Provider value={contextValues}>
        {children}
    </TodoContext.Provider>
  )

}
