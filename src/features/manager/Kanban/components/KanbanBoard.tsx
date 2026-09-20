import KanbanColumn from "./KanbanColumn";

import type {
    KanbanTask,
    TaskStatus
} from "../types/kanban.types";

import "../styles/KanbanBoard.css";


interface Props {

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
    canManageTasks?: boolean;
}


const columns = [

    {
        title: "À faire",
        status: "TODO" as TaskStatus
    },

    {
        title: "En cours",
        status: "IN_PROGRESS" as TaskStatus
    },

    {
        title: "Terminé",
        status: "DONE" as TaskStatus
    }

];


export default function KanbanBoard({

    tasks,

    onAddTask,

    onEditTask,

    onDeleteTask,

    onMoveTask,
    canManageTasks = true

}: Props) {


    return (

        <div className="kanban-board">

            {columns.map(column => (

                <KanbanColumn

                    key={column.status}

                    title={column.title}

                    status={column.status}

                    tasks={
                        tasks.filter(
                            task =>
                                task.status ===
                                column.status
                        )
                    }

                    onAddTask={onAddTask}

                    onEditTask={onEditTask}

                    onDeleteTask={onDeleteTask}

                    onMoveTask={onMoveTask}
                    canManageTasks={canManageTasks}

                />

            ))}

        </div>
    );
}