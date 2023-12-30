import { useState } from "react";
import { AddTodo } from "./components/AddTodo";
import { TodoList } from "./components/TodoList"
import {Todo} from './components/shared/interfaces/TodoInterfaces'

const App: React.FC = () => {
  const [todos,setTodos] = useState<Todo[]>([])

  return (
    <>
      <TodoList items={todos}/> 
      <AddTodo setTodos={setTodos}/>
    </>
  )
}

export default App
