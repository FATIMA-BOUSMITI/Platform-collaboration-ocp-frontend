import {
    FiMessageSquare,
    FiMoreVertical
} from "react-icons/fi";

import type {
    KanbanTask
} from "../types/kanban.types";

import "../styles/KanbanTaskCard.css";


interface Props {

    task: KanbanTask;

    onEdit: (
        task: KanbanTask
    ) => void;

    onDelete: (
        taskId: string
    ) => void;
    canManageTasks?: boolean;
}


export default function KanbanTaskCard({

    task,

    onEdit,

    onDelete,
    canManageTasks = true

}: Props) {


    const handleDragStart = (
        e: React.DragEvent
    ) => {

        e.dataTransfer.setData(
            "taskId",
            task.id
        );

        e.dataTransfer.effectAllowed =
            "move";
    };


    const priorityLabel = {

        LOW: "Low",

        MEDIUM: "Medium",

        HIGH: "High"

    };


    return (

        <div

            className="kanban-task-card"

            draggable={canManageTasks}

            onDragStart={handleDragStart}
        >

            <div className="task-card-top">

                <span
                    className={`priority-badge ${task.priority.toLowerCase()}`}
                >

                    {
                        priorityLabel[
                            task.priority
                        ]
                    }

                </span>


                {canManageTasks && <div className="task-menu">

                    <button
                        type="button"
                        className="task-menu-button"
                    >
                        <FiMoreVertical />
                    </button>


                    <div className="task-menu-dropdown">

                        <button
                            type="button"
                            onClick={() =>
                                onEdit(task)
                            }
                        >
                            Modifier
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                onDelete(task.id)
                            }
                        >
                            Supprimer
                        </button>

                    </div>

                </div>}

            </div>


            <h3 className="task-title">

                {task.title}

            </h3>


            {task.description && (

                <p className="task-description">

                    {task.description}

                </p>

            )}


            <div className="task-card-footer">

                <span className="assignee">

                    {task.assignee}

                </span>


                <span className="comments">

                    <FiMessageSquare />

                    {task.commentsCount}

                </span>

            </div>

        </div>
    );
}