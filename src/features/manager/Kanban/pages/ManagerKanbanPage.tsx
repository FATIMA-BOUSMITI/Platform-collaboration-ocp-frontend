import KanbanHeader from "../components/KanbanHeader";
import KanbanBoard from "../components/KanbanBoard";

import type { Task } from "../types/Kanban.Types";

import "../styles/ManagerKanbanPage.css";

const mockTasks: Task[] = [
    {
        id: "1",
        title: "Rédiger les spécifications techniques API",
        priority: "MEDIUM",
        status: "TODO",
        assignee: "KT",
        commentsCount: 3
    },
    {
        id: "2",
        title: "Corriger la faille de rafraîchissement JWT",
        priority: "HIGH",
        status: "TODO",
        assignee: "YE",
        commentsCount: 2
    },
    {
        id: "3",
        title: "Mise à jour des composants UI React",
        priority: "LOW",
        status: "IN_PROGRESS",
        assignee: "YE",
        commentsCount: 0
    }
];

export default function ManagerKanbanPage() {

    return (
        <div className="kanban-page">

            <KanbanHeader />

            <KanbanBoard tasks={mockTasks} />

        </div>
    );
}