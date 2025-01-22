import { useDispatch, useSelector } from "react-redux"
import { filterTodos, markAllCompleted } from "../state/todo/slice";
import { selectCurrentFilter } from "../state/todo/selector";

const FilterBar = () => {
    const dispatch = useDispatch()
    const currentFilter = useSelector(selectCurrentFilter);
    const handleFilter = (filter) => {
        dispatch(filterTodos({filter}))
    }
    return (
        <div className="flex space-x-4 items-center">
            <select
            value={currentFilter}
            onChange={(e)=> handleFilter(e.target.value)} 
            className="text-sm px-2 py-1 rounded border border-gray-300 focus:outline-none">
                <option value="ALL">Default</option>
                <option value="COMPLETED">Completed</option>
                <option value="INCOMPLETE">Incomplete</option>
            </select>

            <button onClick={() => dispatch(markAllCompleted())} className="text-sm px-2 py-1 bg-purple-500 text-white ml-2 rounded">Mark all Completed</button>
        </div>
    )
}
export default FilterBar