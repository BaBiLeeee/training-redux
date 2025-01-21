import { useSelector } from "react-redux"
import { TodoItem } from "./TodoItem"
import { selectFilteredTodos } from "../state/todo/selector";

const TodoList = () => {
    const filteredTodos = useSelector(selectFilteredTodos);
        console.log("filter", filteredTodos)
    return (
        <ul>
            <li className="my-2 text-sm italic">All note..</li>
            {
                filteredTodos.map((todo, index) => (
                    <TodoItem key={index} todo={todo} index={index}/>
                ))
            }
            
        </ul>
    )
}
export default TodoList