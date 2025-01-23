import { put, fork, takeLatest, cancel, select } from "redux-saga/effects";
import { decrementTimer, resetTimer, startTimer, timerTimesup } from "./slice";
import { updateTodoStatus } from "../todo/slice";
import { selectTimerActiveState, selectTimerTime } from "./selector";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const todoStatus = {
    Idle: "idle",
    Running: "running",
};

function* tick() {
    try {
        while (true) {
            const time = yield select(selectTimerTime);
            if (time > 0) {
                yield put(decrementTimer());
                yield delay(1000);
            } else {
                yield put(timerTimesup());
                return;
            }
        }
    } catch (error) {
        console.error("Timer error:", error);
    }
}

function* timer(action) {
    const isActive = yield select(selectTimerActiveState);
    if (!isActive) {
        return;
    }
    if (action.payload === todoStatus.Running) {
        yield put(startTimer());
        const timerTask = yield fork(tick);
        yield takeLatest(updateTodoStatus, function* (nextAction) {
            if (nextAction.payload !== todoStatus.Running) {
                yield cancel(timerTask);
                yield put(resetTimer());
            }
        });
    } else {
        yield put(resetTimer());
    }
}

export function* watchTodoStatus() {
    yield takeLatest(updateTodoStatus, timer);
}

export default function* rootSaga() {
    yield watchTodoStatus();
}
