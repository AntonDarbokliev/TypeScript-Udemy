// import { useContext } from "react";
import { AddTodo } from "./components/AddTodo";
import { TodoList } from "./components/TodoList"
import { TodoContextProvider } from "./components/contexts/TodosContext";



const App: React.FC = () => {

  return (
    <>
    <TodoContextProvider>
      <TodoList /> 
      <AddTodo />
    </TodoContextProvider>
    </>
  )
}

export default App
