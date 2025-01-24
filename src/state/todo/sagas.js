import { all, call, put, takeEvery } from "redux-saga/effects";
import {
    fetchTodosFailure,
    fetchTodosRequest,
    fetchTodosSuccess,
} from "../todo/slice";

const fetchTodosFromAPI = async () => {
    const response = await fetch("http://localhost:5173/todo.json");

    if (!response.ok) {
        throw new Error("Failed to fetch todos");
    }

    return response.json();
};

function* fetchTodos() {
    try {
        const todos = yield call(fetchTodosFromAPI);
        yield put(fetchTodosSuccess(todos));
    } catch (error) {
        yield put(fetchTodosFailure(error.message));
    }
}

function* watchTodoFetchAsync() {
    yield takeEvery(fetchTodosRequest.type, fetchTodos);
}

export default function* rootSaga() {
    yield all([watchTodoFetchAsync()]);
}
