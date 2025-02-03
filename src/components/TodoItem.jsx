import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { removeTodo, toggleTodo, updateTodo, updateTodoStatus } from "../state/todo/slice";
import { resetTimer } from "../state/timer/slice";
import { selectTodoStatus } from "../state/todo/selector";
import { selectTimerActiveState, selectTimerStatus } from "../state/timer/selector";
import PropTypes from "prop-types";
import { Switch } from "@mui/material";
import { toast } from "react-toastify";

export const TodoItem = ({ todo }) => {
    TodoItem.propTypes = {
        todo: PropTypes.shape({
            id: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired,
            completed: PropTypes.bool.isRequired,
        }).isRequired,
    };
    const todoStatus = {
        Idle: "idle",
        Running: "running",
    };
    const isActive = useSelector(selectTimerActiveState)
    const timerStatus = useSelector(selectTimerStatus)
    const todoCurrentStatus = useSelector(selectTodoStatus)
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(todo.text);

    useEffect(() => {
        if (timerStatus === "timesup") {
            setNewText(todo.text);
            dispatch(resetTimer());
            dispatch(updateTodoStatus(todoStatus.Idle));
        }
    }, [timerStatus, todo.text, dispatch]);

    const handleUpdate = () => {
        if (newText.trim()) {
            dispatch(updateTodo({ id: todo.id, text: newText.trim() }));
            setIsEditing(false);
            toast.success("update todo note successfully!")
            dispatch(updateTodoStatus(todoStatus.Idle))
        }
    };

    const handleKeyUp = (e) => {
        if (e.key === "Enter") {
            handleUpdate();
        } else if (e.key === "Escape") {
            setIsEditing(false);
            setNewText(todo.text);
            dispatch(updateTodoStatus(todoStatus.Idle))
        }
    };

    const handleChangeNote = (value) => {
        setNewText(value);

        if (isActive && value.trim()) {
            if (todoCurrentStatus !== todoStatus.Running) {
                dispatch(updateTodoStatus(todoStatus.Running));
            }
        } else {
            dispatch(updateTodoStatus(todoStatus.Idle));
        }
    }

    return (
        <li className="flex justify-between border-b-2 py-2 gap-4" onClick={() => setIsEditing(true)}>
            <div className="flex items-center" >
                {isEditing ? (
                    <input
                        type="text"
                        value={newText}
                        onChange={(e) => handleChangeNote(e.target.value)}
                        onKeyUp={handleKeyUp}
                        onBlur={handleUpdate}
                        autoFocus
                    />
                ) : (
                    <span
                        className={`${todo.completed ? "line-through text-red-500" : ""}`}
                        title="Click to edit"
                    >
                        {todo.text}
                    </span>
                )}
            </div>
            <div className="space-x-3">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        dispatch(toggleTodo({ id: todo.id }));
                    }}
                >
                    {todo.completed ? <Switch checked={true} /> : <Switch checked={false} />}
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toast.success("Delete todo note successfully!")
                        dispatch(removeTodo({ id: todo.id }))
                    }}
                >
                    <FaTrash className="text-red-500 size-5" />
                </button>
            </div>
        </li>
    );
};
