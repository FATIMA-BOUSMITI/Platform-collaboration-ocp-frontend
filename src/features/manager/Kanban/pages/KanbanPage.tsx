import { useEffect, useState } from "react";
import { useAuthStore } from "../../../auth/AuthStore";

import KanbanHeader from "../components/KanbanHeader";
import KanbanBoard from "../components/KanbanBoard";
import TaskModal from "../components/TaskModal";
import CreateProjectModal from "../components/CreateProjectModal";
import type { Project } from "../types/Project.Types";
import type {
    KanbanTask,
    TaskPriority,
    TaskStatus
} from "../types/kanban.types";

import "../styles/KanbanPage.css";
import ProjectCard from "../components/ProjectCard";
import { createProject, getProjects } from "../../../../api/projectApi";
import { createTask, getProjectTasks, updateTask, updateTaskStatus, type TaskResponse } from "../../../../api/taskApi";

function mapTask(task: TaskResponse): KanbanTask {
    return {
        id: task.id,
        title: task.title,
        description: task.description,
        priority: task.priority === "CRITICAL" ? "HIGH" : task.priority,
        status: task.status === "REVIEW" ? "IN_PROGRESS" : task.status === "ARCHIVED" ? "DONE" : task.status,
        assignee: task.assigneeId ?? "Non assignée",
        commentsCount: 0,
    };
}

export default function KanbanPage() {
    const role = useAuthStore((state) => state.role);
    const canManageProjects = role === "DIRECTOR" || role === "MANAGER";

    const [tasks, setTasks] = useState<KanbanTask[]>([]);

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

const [projects, setProjects] =useState<Project[]>([]);
const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
const [error, setError] = useState("");


useEffect(() => {
    async function fetchProjects() {
        try {
            const  response = await getProjects();  
            setProjects(response);
            setSelectedProjectId(response[0]?.id ?? null);
        } catch {
            setError("Impossible de charger les projets.");
        }
       
    }
    fetchProjects();
}, []);

useEffect(() => {
    if (!selectedProjectId) {
        return;
    }

    getProjectTasks(selectedProjectId)
        .then((response) => setTasks(response.map(mapTask)))
        .catch(() => setError("Impossible de charger les tâches du projet."));
}, [selectedProjectId]);
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
    const handleCreateTask = async (
        title: string,
        description: string,
        priority: TaskPriority,
        assignee: string
    ) => {
        if (!selectedProjectId) {
            setError("Sélectionnez un projet avant de créer une tâche.");
            return;
        }

        try {
            const created = await createTask(selectedProjectId, {
                title,
                description,
                priority,
                assigneeId: assignee,
            });
            setTasks(prev => [...prev, mapTask(created)]);
            setModalOpen(false);
        } catch {
            setError("Impossible de créer la tâche.");
        }
    };


    /*
     * Modifier une tâche
     */
    const handleUpdateTask = async (updatedTask: KanbanTask) => {
        try {
            const saved = await updateTask(updatedTask.id, {
                title: updatedTask.title,
                description: updatedTask.description ?? "",
                priority: updatedTask.priority,
                assigneeId: updatedTask.assignee,
            });
            setTasks(prev => prev.map(task => task.id === saved.id ? mapTask(saved) : task));
            setModalOpen(false);
        } catch {
            setError("Impossible de modifier la tâche.");
        }
    };


    /*
     * Supprimer une tâche
     */
    const handleDeleteTask = async (
        taskId: string
    ) => {

        const confirmed =
            window.confirm(
                "Voulez-vous vraiment supprimer cette tâche ?"
            );

        if (!confirmed) {
            return;
        }

        try {
            await updateTaskStatus(taskId, "ARCHIVED");
            setTasks(prev => prev.filter(task => task.id !== taskId));
        } catch {
            setError("Impossible d'archiver la tâche.");
        }
    };


    /*
     * Drag & Drop
     */
    const handleMoveTask = async (
        taskId: string,
        newStatus: TaskStatus
    ) => {

        try {
            const saved = await updateTaskStatus(taskId, newStatus);
            setTasks(prev => prev.map(task => task.id === saved.id ? mapTask(saved) : task));
        } catch {
            setError("Impossible de changer le statut de la tâche.");
        }
    };


    return (

    <div className="kanban-page">
        {error && <div className="kanban-error">{error}</div>}
        {view === "kanban" && projects.length > 0 && (
            <label className="kanban-project-select">
                Projet actif
                <select value={selectedProjectId ?? ""} onChange={(event) => setSelectedProjectId(event.target.value || null)}>
                    {projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}
                </select>
            </label>
        )}

        <KanbanHeader

            view={view}

            onViewChange={setView}

            onCreateProject={() =>
                setProjectModalOpen(true)
            }
            canManageProjects={canManageProjects}

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
                canManageTasks={canManageProjects}

            />

        )}


        
        {/* VUE PROJETS */}
       

        {view === "projects" && (

    <div className="projects-grid">

        {projects?.map(project => (

            <ProjectCard
                key={project.id}
                project={project}
            />

        ))}

    </div>

)}

        {/* TASK MODAL */}
        
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


        
        {/* PROJECT MODAL */}
       

        {projectModalOpen && (

            <CreateProjectModal

                onClose={() =>
                    setProjectModalOpen(false)
                }

                onCreate={async (project) => {
                    try {
                        const created = await createProject({
                            name: project.name,
                            description: project.description,
                            responsableId: project.manager ?? "",
                            departmentId: project.department ?? "",
                            startDate: new Date().toISOString().slice(0, 10),
                            endDate: project.deadline ?? new Date().toISOString().slice(0, 10),
                            priority: "MEDIUM",
                            budget: 0,
                        });
                        setProjects(prev => [...prev, created]);
                        setSelectedProjectId(created.id);
                        setProjectModalOpen(false);
                    } catch {
                        setError("Impossible de créer le projet.");
                    }
                }}

            />

        )}

    </div>
);
}