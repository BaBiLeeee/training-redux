import { useCallback, useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
    addTodo,
    fetchTodosRequest,
    updateSearchTerm,
    updateTodoStatus,
} from "../state/todo/slice";
import FilterBar from "./FilterBar";
import TodoList from "./TodoList";
import { debounce } from "lodash";
import { Switch } from "@mui/material";
import TimerDisplay from "./Timer";
import { selectTodoStatus } from "../state/todo/selector";
import { resetTimer, toggleTimerActiveState } from "../state/timer/slice";
import { selectTimerActiveState, selectTimerStatus } from "../state/timer/selector";
import { toast } from "react-toastify";
const Todo = () => {
    const todoStatus = {
        Idle: "idle",
        Running: "running",
    };
    const dispatch = useDispatch();
    const [newTodoText, setNewTodoText] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const timerCurrentStatus = useSelector(selectTimerStatus)
    const todoCurrentStatus = useSelector(selectTodoStatus);
    const isActive = useSelector(selectTimerActiveState)
    useEffect(() => {
        dispatch(fetchTodosRequest());
    }, [dispatch]);
    useEffect(() => {
        if (timerCurrentStatus === "timesup") {
            setNewTodoText("")
            toast.info("Running out of time!!!")
            dispatch(resetTimer())
            dispatch(updateTodoStatus(todoStatus.Idle))
        }
    }, [timerCurrentStatus]);

    const handleAddToDo = () => {
        if (newTodoText.trim()) {
            dispatch(addTodo({ text: newTodoText.trim() }));
            setNewTodoText("");
            toast.success("Todo added successfully!")
            dispatch(updateTodoStatus(todoStatus.Idle));
        }
    };

    const handleAddToDoChange = (value) => {
        setNewTodoText(value);

        if (isActive && value.trim() != "") {
            if (todoCurrentStatus !== todoStatus.Running) {
                dispatch(updateTodoStatus(todoStatus.Running));
            }
        } else {
            dispatch(updateTodoStatus(todoStatus.Idle));
        }
    };

    const handleKeyUp = (e) => {
        if (e.key === "Enter") {
            handleAddToDo();
        }
    };

    const debouncedSearch = useCallback(
        debounce((value) => {
            dispatch(updateSearchTerm({ searchTerm: value.trim() }));
        }, 500),
        [dispatch]
    );

    const handleSearchChange = (value) => {
        setSearchTerm(value);
        debouncedSearch(value);
    };

    const handleSwitchToggle = (e) => {
        const isChecked = e.target.checked;
        dispatch(toggleTimerActiveState(isChecked));
        if (!isChecked) {
            dispatch(updateTodoStatus(todoStatus.Idle))
        }
    };

    return (
        <div className="max-w-4xl mx-auto sm:mt-8 p-4 bg-gray-100 rounded">
            <h2 className="mt-3 mb-6 text-2xl font-bold text-center uppercase">
                Personal TODO APP
            </h2>

            <div className="flex items-center mb-4">
                <input
                    id="addTodoInput"
                    className="flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                    type="text"
                    placeholder="Add Todo"
                    value={newTodoText}
                    onChange={(e) => handleAddToDoChange(e.target.value)}
                    onKeyUp={handleKeyUp}
                />
                <button
                    className="ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                    onClick={handleAddToDo}
                >
                    <BsPlus size={20} />
                </button>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <FilterBar />
                <div className="flex items-center mb-4">
                    <input
                        className="flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                        type="text"
                        placeholder="Search Todos"
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex items-center justify-start mb-4">
                <Switch checked={isActive} onChange={handleSwitchToggle} />
                <span className="ml-2 text-gray-700">
                    Timer
                </span>
            </div>
            {isActive ? (
                <>
                    <div>
                        <TimerDisplay />
                    </div>
                </>
            ) : (
                <></>
            )}
            <TodoList searchValue={searchTerm} />
        </div>
    );
};

export default Todo;
