import { useSelector, useDispatch } from "react-redux";
import { TodoItem } from "./TodoItem";
import { selectFilteredTodos } from "../state/todo/selector";
import { reorderTodos } from "../state/todo/slice"; // ✅ Import action mới
import PropTypes from "prop-types";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

const TodoList = ({ searchValue }) => {
    TodoList.propTypes = {
        searchValue: PropTypes.string,
    };

    const dispatch = useDispatch();
    const filteredTodos = useSelector(selectFilteredTodos); // Lấy danh sách từ Redux

    const text = searchValue
        ? filteredTodos.length > 0
            ? `Notes containing "${searchValue}"`
            : "Oops, cannot find your note"
        : filteredTodos.length > 0
            ? "All notes..."
            : "Let’s add your note";

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const newTodos = Array.from(filteredTodos);
        const [draggedItem] = newTodos.splice(result.source.index, 1);
        newTodos.splice(result.destination.index, 0, draggedItem);

        // ✅ Dispatch action để cập nhật thứ tự mới vào Redux
        dispatch(reorderTodos(newTodos));
    };

    return (
        <div>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="todos">
                    {(provided) => (
                        <ul
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <li className="my-2 text-sm italic">{text}</li>
                            {filteredTodos.map((todo, index) => (
                                <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={provided.draggableProps.style}
                                            className="p-4 border rounded-md cursor-pointer bg-white mt-2"
                                        >
                                            <TodoItem key={todo.id} todo={todo} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default TodoList;
