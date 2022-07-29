import CN from "classnames";
import { Check } from '@mui/icons-material';
import './TodoItem.scss';

function TodoItem({ id, taskName, isCompleted, priority, handleClick }) {

    const PriorityIndicatorClasses = CN({
        "priority-label priority-label__high": priority === "High",
        "priority-label priority-label__med": priority === "Med",
        "priority-label priority-label__low": priority === "Low",
        "priority-label": priority == undefined
    });

    const onHandleClick = () => {
        handleClick(id, isCompleted)
    }

    return (
        <div className="main-conatiner" onClick={() => onHandleClick()}>
            <div className="info-container">
                <span className={isCompleted ? "complete-tick" : "uncomplete-tick"}>
                    <Check name="check" size="small" className="check" />
                </span>
                <label className="task-name">{isCompleted ? <s>{taskName}</s> : taskName}</label>
                <div className={PriorityIndicatorClasses}>{priority}</div>
            </div>
        </div>
    );
}

export default TodoItem;