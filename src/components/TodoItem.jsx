/* eslint-disable react/prop-types */
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { removeTodo, toggleTodo, updateTodo } from "../state/todo/slice";
import { useState } from "react";

export const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false); 
  const [newText, setNewText] = useState(todo.text); 

  const handleUpdate = () => {
    if (newText.trim()) {
      dispatch(updateTodo({ id: todo.id, text: newText.trim() }));
      setIsEditing(false); 
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleUpdate();
    } else if (e.key === "Escape") {
      setIsEditing(false); 
      setNewText(todo.text);
    }
  };

  return (
    <li className="flex justify-between border-b-2 py-2 gap-4">
      <div className="flex items-center" onClick={() => setIsEditing(true)} >
        {isEditing ? (
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleUpdate} 
            className="border rounded px-2 py-1 w-full"
            autoFocus 
          />
        ) : (
          <span
            className={`${todo.completed ? "line-through text-red-500" : ""}`}
            title="Double click to edit"
          >
            {todo.text}
          </span>
        )}
      </div>
      <div className="space-x-3">
        <button onClick={() => dispatch(toggleTodo({ id: todo.id }))}>
          {todo.completed ? <FaToggleOff className="size-5" /> : <FaToggleOn className="size-5" />}
        </button>
        <button onClick={() => dispatch(removeTodo({ id: todo.id }))}>
          <FaTrash className="text-red-500 size-5" />
        </button>
      </div>
    </li>
  );
};
