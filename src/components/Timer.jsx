import { useSelector} from "react-redux";
import { selectTimerTime } from "../state/timer/selector";

const Timer = () => {
    const time = useSelector(selectTimerTime);
    

    return (
        <div>
            <p>
                <strong>Time Remaining:</strong> {time}s
            </p>
        </div>
    );
};

export default Timer;
