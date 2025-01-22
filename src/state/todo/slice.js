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
      state.todos.push({ text: action.payload.text, completed: false, id: Date.now() });
    },

    toggleTodo: (state, action) => {
        const todo = state.todos.find((t) => t.id === action.payload.id);
        if (todo) {
            todo.completed = !todo.completed;
        }
    },    

    removeTodo: (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
    
    updateTodo: (state, action) => {
        const todo = state.todos.find((t) =>  t.id === action.payload.id);
        if (todo) {
            todo.text = action.payload.text
        }
    },

    filterTodos: (state, action) => {
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
  updateTodo,
  filterTodos,
  updateSearchTerm,
  markAllCompleted,
} = slice.actions;

export default slice.reducer;
