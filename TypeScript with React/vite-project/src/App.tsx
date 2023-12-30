import { TodoList } from "./components/TodoList"

interface Todo {
  id:string,
  text:string
}


const App: React.FC = () => {
  const todos:Todo[] = [{id:'1',text: 'Clean your room'}];

  return (
    <>
      <TodoList items={todos}/>    
    </>
  )
}

export default App
