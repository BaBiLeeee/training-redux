import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  filter: 'ALL',
  searchTerm: '',
};

const slice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({ text: action.payload.text, completed: false });
    },

    toggleTodo: (state, action) => {
      const todo = state.todos[action.payload.index];
      if (todo) {
        todo.completed = !todo.completed;
      }
    },

    removeTodo: (state, action) => {
      state.todos.splice(action.payload.index, 1);
    },

    filterTodos: (state, action) => {
        console.log("aaa|", action.payload.filter)
      state.filter = action.payload.filter;
    },

    updateSearchTerm: (state, action) => {
      state.searchTerm = action.payload.searchTerm;
    },

    markAllCompleted: (state) => {
      state.todos.forEach((todo) => {
        todo.completed = true;
      });
    },
  },
});

export const {
  addTodo,
  toggleTodo,
  removeTodo,
  filterTodos,
  updateSearchTerm,
  markAllCompleted,
} = slice.actions;

export default slice.reducer;
