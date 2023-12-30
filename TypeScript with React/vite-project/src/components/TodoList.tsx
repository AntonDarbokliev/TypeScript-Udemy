interface TodoListProps {
    items:{id:string, text:string}[]
}

export const TodoList: React.FC<TodoListProps> = (props) => {
    return(
        <>
        {props.items.map(item => <li key={item.id}>{item.text}</li>)}
        </>
    )
}