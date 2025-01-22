import { useSelector } from "react-redux";
import { TodoItem } from "./TodoItem";
import { selectFilteredTodos } from "../state/todo/selector";

// eslint-disable-next-line react/prop-types
const TodoList = ({ searchValue }) => {
  const filteredTodos = useSelector(selectFilteredTodos);

  const text = searchValue
    ? filteredTodos.length > 0
      ? `Notes containing "${searchValue}"`
      : "Oops, cannot find your note"
    : filteredTodos.length > 0
    ? "All notes..."
    : "Nothing to show";

  return (
    <ul>
      <li className="my-2 text-sm italic">{text}</li>
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
