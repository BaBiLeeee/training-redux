import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTimerTime, selectTimerStatus } from "../state/timer/selector";
import { updateTodoStatus } from "../state/todo/slice";

const Timer = () => {
    const dispatch = useDispatch();
    const time = useSelector(selectTimerTime);
    const status = useSelector(selectTimerStatus);

    useEffect(() => {
        dispatch(updateTodoStatus("running"));

        return () => {
            dispatch(updateTodoStatus("idle"));
        };
    }, [dispatch]);

    return (
        <div>
            <h1>Timer</h1>
            <p>
                <strong>Time Remaining:</strong> {time}s
            </p>
            <p>
                <strong>Status:</strong> {status}
            </p>
        </div>
    );
};

export default Timer;
