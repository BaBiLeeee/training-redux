import { useCallback, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addTodo, updateSearchTerm } from "../state/todo/slice";
import FilterBar from "./FilterBar";
import TodoList from "./TodoList";
import { debounce } from "lodash";

const Todo = () => {
    const dispatch = useDispatch()
    const [searchTerm, setSearchTerm] = useState();
    const [newTodoText, setNewTodoText] = useState("");

    const handleAddToDo = () => {
        if(newTodoText.trim() !== "") {
            dispatch(addTodo({text: newTodoText.trim()}))
            setNewTodoText("")
        }
    }
    const debouncedDispatch = useCallback(
        debounce((value) => {
            dispatch(updateSearchTerm({ searchTerm: value.trim() }));
        }, 1000),
        [dispatch]
    );

    const handleSearchChange = (value) => {
        setSearchTerm(value);
        debouncedDispatch(value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleAddToDo();
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
          onChange={(e) => setNewTodoText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
            onClick={handleAddToDo}
        >
          <BsPlus size={20} />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <FilterBar/>
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
      <TodoList/>
    </div>
  );
};

export default Todo;