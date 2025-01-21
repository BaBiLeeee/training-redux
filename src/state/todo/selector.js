export const selectFilteredTodos = (state) => {
    const todos = state.todos.todos;
    const filter = state.todos.filter;
    const searchTerm = state.todos.searchTerm.toLowerCase();

    return todos.filter((todo) => {
        const matchsFilter =
            (filter === "COMPLETED" && todo.completed) ||
            (filter === "INCOMPLETE" && !todo.completed) ||
            (filter === "ALL");

        const matchsSearch = todo.text.toLowerCase().includes(searchTerm);

        return matchsFilter && matchsSearch;
    });
};

export const selectCurrentFilter = (state) => state.todos.filter;

