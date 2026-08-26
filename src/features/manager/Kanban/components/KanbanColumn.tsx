import { FiPlus } from "react-icons/fi";

import KanbanTaskCard from "./KanbanTaskCard";
import EmptyColumn from "./EmptyColumn";

import type {
    KanbanTask,
    TaskStatus
} from "../types/Kanban.Types";

import "../styles/KanbanColumn.css";


interface Props {

    title: string;

    status: TaskStatus;

    tasks: KanbanTask[];

    onAddTask: (
        status: TaskStatus
    ) => void;

    onEditTask: (
        task: KanbanTask
    ) => void;

    onDeleteTask: (
        taskId: string
    ) => void;

    onMoveTask: (
        taskId: string,
        status: TaskStatus
    ) => void;
}


export default function KanbanColumn({

    title,

    status,

    tasks,

    onAddTask,

    onEditTask,

    onDeleteTask,

    onMoveTask

}: Props) {


    const handleDragOver = (
        e: React.DragEvent
    ) => {

        e.preventDefault();

    };


    const handleDrop = (
        e: React.DragEvent
    ) => {

        e.preventDefault();

        const taskId =
            e.dataTransfer.getData(
                "taskId"
            );

        if (!taskId) {
            return;
        }

        onMoveTask(
            taskId,
            status
        );
    };


    return (

        <div
            className="kanban-column"

            onDragOver={handleDragOver}

            onDrop={handleDrop}
        >

            <div className="kanban-column-header">

                <div className="column-title">

                    <span
                        className={`status-dot ${status.toLowerCase()}`}
                    />

                    <span>
                        {title}
                    </span>

                    <span className="task-count">

                        {tasks.length}

                    </span>

                </div>


                <button

                    type="button"

                    className="add-task-button"

                    onClick={() =>
                        onAddTask(status)
                    }

                >
                    <FiPlus />

                </button>

            </div>


            <div className="kanban-column-body">

                {tasks.length === 0 ? (

                    <EmptyColumn />

                ) : (

                    tasks.map(task => (

                        <KanbanTaskCard

                            key={task.id}

                            task={task}

                            onEdit={onEditTask}

                            onDelete={onDeleteTask}

                        />

                    ))

                )}

            </div>

        </div>
    );
}