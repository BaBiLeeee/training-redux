/* eslint-disable react/prop-types */
import {FaToggleOff, FaToggleOn, FaTrash} from "react-icons/fa"
import { useDispatch } from "react-redux"
import { removeTodo, toggleTodo } from "../state/todo/slice"
// eslint-disable-next-line react/prop-types
export const TodoItem = ({todo, index}) => {
    const dispatch = useDispatch()
    return (
        <li className="flex justify-between border-b-2 py-2 gap-4">
            <div className="flex items-center">
                <span className="mr-4 text-gray-500">{index+1}</span>
                <span className={`${todo.completed ? 'line-through text-red-500' : ''}`}>{todo.text}</span>
            </div>
            <div className="space-x-3">
                <button onClick={() => dispatch(toggleTodo({index: index}))}>{todo.completed ? <FaToggleOff className="size-5"/> : <FaToggleOn className="size-5"/>}</button>
                <button onClick={() => dispatch(removeTodo({index: index}))}>
                    <FaTrash className="text-red-500 size-5"/>
                </button>
            </div>
        </li>
    )
}