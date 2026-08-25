import { FiPlus } from "react-icons/fi";

import TaskCard from "./TaskCard";

import type {
    Task,
    TaskStatus
} from "../types/Kanban.Types";

import "../styles/KanbanColumn.css";

interface Props {
    title: string;
    status: TaskStatus;
    tasks: Task[];
}

export default function KanbanColumn({
    title,
    status,
    tasks
}: Props) {

    return (
        <div className={`kanban-column ${status.toLowerCase()}`}>

            <div className="kanban-column-header">

                <div className="column-title">

                    <span className="status-dot"></span>

                    <span>{title}</span>

                    <span className="task-count">
                        {tasks.length}
                    </span>

                </div>

                <button className="add-task-button">
                    <FiPlus />
                </button>

            </div>

            <div className="kanban-column-body">

                {tasks.length === 0 ? (

                    <div className="empty-column">
                        Déposez des tâches ici
                    </div>

                ) : (

                    tasks.map(task => (

                        <TaskCard
                            key={task.id}
                            task={task}
                        />

                    ))

                )}

            </div>

        </div>
    );
}