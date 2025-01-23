import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todo/slice"
import timerReducer from "./timer/slice"
import createSagaMiddleware from 'redux-saga'
import rootTodoSaga from "../state/todo/sagas";
import rootTimerSaga from "../state/timer/sagas"

const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
    reducer: {
        todos: todoReducer,
        timer: timerReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})
sagaMiddleware.run(rootTodoSaga)
sagaMiddleware.run(rootTimerSaga)

export default store;