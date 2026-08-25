import KanbanColumn from "./KanbanColumn";

import type {
    Task,
    TaskStatus
} from "../types/Kanban.Types";

import "../styles/KanbanBoard.css";

interface Props {
    tasks: Task[];
}

export default function KanbanBoard({ tasks }: Props) {

    const columns: {
        title: string;
        status: TaskStatus;
    }[] = [
        {
            title: "À faire",
            status: "TODO"
        },
        {
            title: "En cours",
            status: "IN_PROGRESS"
        },
        {
            title: "Terminé",
            status: "DONE"
        }
    ];

    return (
        <div className="kanban-board">

            {columns.map(column => (

                <KanbanColumn
                    key={column.status}
                    title={column.title}
                    status={column.status}
                    tasks={tasks.filter(
                        task => task.status === column.status
                    )}
                />

            ))}

        </div>
    );
}