import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { removeTodo, toggleTodo, updateTodo, updateTodoStatus } from "../state/todo/slice";
import { resetTimer } from "../state/timer/slice";
import { selectTodoStatus } from "../state/todo/selector";
import { selectTimerActiveState, selectTimerStatus } from "../state/timer/selector";
import PropTypes from "prop-types";
import { Box, Button, Modal, Switch, Typography } from "@mui/material";
import { toast } from "react-toastify";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "8px",
    boxShadow: 24,
    p: 4,
  };

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
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
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
            toast.success("Todo updated successfully!")
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
                    className="w-full h-10 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200"
                    autoFocus
                    placeholder="Please text something..."
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
                <Button 
                    onClick={(e) => {
                        e.stopPropagation();
                        handleOpen();
                    }}
                >
                    <FaTrash className="text-red-500 size-5" />
                </Button>
                <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" className="text-center font-semibold">
                        Confirm delete?
                    </Typography>
                    <Typography variant="body1" className="text-center text-gray-600">
                        Are you sure want to delete?
                    </Typography>
                    <div className="flex justify-center gap-4 mt-4">
                        <Button
                            variant="contained"
                            color="error"
                            onClick={(e) => {
                                e.stopPropagation();
                                toast.success("Todo deleted successfully!");
                                dispatch(removeTodo({ id: todo.id }));
                                setOpen(false);
                            }}
                        >
                            Delete
                        </Button>
                        <Button variant="outlined" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                    </div>
                </Box>
            </Modal>
            </div>
        </li>
    );
};
