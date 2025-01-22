import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todo/slice"
import createSagaMiddleware from 'redux-saga'
import rootTodoSaga from "../state/todo/sagas";

const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
    reducer: {
        todos: todoReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})
sagaMiddleware.run(rootTodoSaga)
export default store;