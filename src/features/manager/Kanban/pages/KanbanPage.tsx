import { useState } from "react";

import KanbanHeader from "../components/KanbanHeader";
import KanbanBoard from "../components/KanbanBoard";
import TaskModal from "../components/TaskModal";
import CreateProjectModal from "../components/CreateProjectModal";
import type { Project } from "../types/Project.Types";
import type {
    KanbanTask,
    TaskPriority,
    TaskStatus
} from "../types/Kanban.Types";

import "../styles/KanbanPage.css";
import ProjectCard from "../components/ProjectCard";


const initialTasks: KanbanTask[] = [

    {
        id: "1",
        title: "Rédiger les spécifications techniques API",
        description: "Préparer les spécifications de l'API.",
        priority: "MEDIUM",
        status: "TODO",
        assignee: "KT",
        commentsCount: 3
    },

    {
        id: "2",
        title: "Corriger la faille de rafraîchissement JWT",
        description: "Corriger le problème lié au refresh token.",
        priority: "HIGH",
        status: "TODO",
        assignee: "YE",
        commentsCount: 2
    },

    {
        id: "3",
        title: "Mise à jour des composants UI React",
        description: "Mettre à jour les composants UI.",
        priority: "LOW",
        status: "IN_PROGRESS",
        assignee: "YE",
        commentsCount: 0
    }

];


export default function KanbanPage() {

    const [tasks, setTasks] =
        useState<KanbanTask[]>(initialTasks);

    const [modalOpen, setModalOpen] =
        useState(false);

    const [selectedStatus, setSelectedStatus] =
        useState<TaskStatus>("TODO");

    const [selectedTask, setSelectedTask] =
        useState<KanbanTask | null>(null);

    const [view, setView] =
    useState<"kanban" | "projects">("kanban");

const [projectModalOpen, setProjectModalOpen] =
    useState(false);

const [projects, setProjects] =
    useState<Project[]>([
        {
            id: "1",
            name: "Migration SAP S/4HANA",
            manager: "Youssef El Fassi",
            department: "IT",
            deadline: "2026-12-15",
            description: "Migration du système SAP.",
            progress: 65,
            membersCount: 8
        },
        {
            id: "2",
            name: "Déploiement MFA Global",
            manager: "Ahmed Darif",
            department: "IT",
            deadline: "2026-08-30",
            description: "Déploiement MFA.",
            progress: 90,
            membersCount: 4
        }
    ]);
    /*
     * Ouvrir le modal pour créer
     */
    const handleAddTask = (
        status: TaskStatus
    ) => {

        setSelectedTask(null);

        setSelectedStatus(status);

        setModalOpen(true);
    };


    /*
     * Ouvrir le modal pour modifier
     */
    const handleEditTask = (
        task: KanbanTask
    ) => {

        setSelectedTask(task);

        setSelectedStatus(task.status);

        setModalOpen(true);
    };


    /*
     * Créer une nouvelle tâche
     */
    const handleCreateTask = (
        title: string,
        description: string,
        priority: TaskPriority,
        assignee: string
    ) => {

        const newTask: KanbanTask = {

            id: crypto.randomUUID(),

            title,

            description,

            priority,

            status: selectedStatus,

            assignee,

            commentsCount: 0

        };


        setTasks(prev => [
            ...prev,
            newTask
        ]);

        setModalOpen(false);
    };


    /*
     * Modifier une tâche
     */
    const handleUpdateTask = (
        updatedTask: KanbanTask
    ) => {

        setTasks(prev =>
            prev.map(task =>
                task.id === updatedTask.id
                    ? updatedTask
                    : task
            )
        );

        setModalOpen(false);
    };


    /*
     * Supprimer une tâche
     */
    const handleDeleteTask = (
        taskId: string
    ) => {

        const confirmed =
            window.confirm(
                "Voulez-vous vraiment supprimer cette tâche ?"
            );

        if (!confirmed) {
            return;
        }

        setTasks(prev =>
            prev.filter(
                task => task.id !== taskId
            )
        );
    };


    /*
     * Drag & Drop
     */
    const handleMoveTask = (
        taskId: string,
        newStatus: TaskStatus
    ) => {

        setTasks(prev =>
            prev.map(task =>
                task.id === taskId
                    ? {
                        ...task,
                        status: newStatus
                    }
                    : task
            )
        );
    };


    return (

    <div className="kanban-page">

        <KanbanHeader

            view={view}

            onViewChange={setView}

            onCreateProject={() =>
                setProjectModalOpen(true)
            }

        />


        {/* ===================== */}
        {/* VUE KANBAN */}
        {/* ===================== */}

        {view === "kanban" && (

            <KanbanBoard

                tasks={tasks}

                onAddTask={handleAddTask}

                onEditTask={handleEditTask}

                onDeleteTask={handleDeleteTask}

                onMoveTask={handleMoveTask}

            />

        )}


        {/* ===================== */}
        {/* VUE PROJETS */}
        {/* ===================== */}

        {view === "projects" && (

    <div className="projects-grid">

        {projects.map(project => (

            <ProjectCard
                key={project.id}
                project={project}
            />

        ))}

    </div>

)}


        {/* ===================== */}
        {/* TASK MODAL */}
        {/* ===================== */}

        {modalOpen && (

            <TaskModal

                task={selectedTask}

                status={selectedStatus}

                onClose={() =>
                    setModalOpen(false)
                }

                onCreate={handleCreateTask}

                onUpdate={handleUpdateTask}

            />

        )}


        {/* ===================== */}
        {/* PROJECT MODAL */}
        {/* ===================== */}

        {projectModalOpen && (

            <CreateProjectModal

                onClose={() =>
                    setProjectModalOpen(false)
                }

                onCreate={(project) => {

                    setProjects(prev => [
                        ...prev,
                        project
                    ]);

                    setProjectModalOpen(false);

                }}

            />

        )}

    </div>
);
}