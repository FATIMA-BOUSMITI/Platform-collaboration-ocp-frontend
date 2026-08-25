import {
    FiMessageSquare,
    FiMoreHorizontal
} from "react-icons/fi";

import type { Task } from "../types/Kanban.Types";

import "../styles/TaskCard.css";

interface Props {
    task: Task;
}

export default function TaskCard({
    task
}: Props) {

    return (
        <div className="kanban-task-card">

            <div className="task-card-top">

                <span className={`priority ${task.priority.toLowerCase()}`}>
                    {task.priority}
                </span>

                <button className="task-menu">
                    <FiMoreHorizontal />
                </button>

            </div>

            <h3>
                {task.title}
            </h3>

            <div className="task-card-footer">

                <span className="assignee">
                    {task.assignee}
                </span>

                <span className="comments">

                    <FiMessageSquare />

                    {task.commentsCount ?? 0}

                </span>

            </div>

        </div>
    );
}