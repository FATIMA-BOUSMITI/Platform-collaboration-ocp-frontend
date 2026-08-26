import { FiGrid, FiList, FiPlus } from "react-icons/fi";
import "../styles/KanbanHeader.css";

interface Props {
    view: "kanban" | "projects";

    onViewChange: (
        view: "kanban" | "projects"
    ) => void;

    onCreateProject: () => void;
}

export default function KanbanHeader({
    view,
    onViewChange,
    onCreateProject
}: Props) {

    return (
        <div className="kanban-header">

            <div className="kanban-header-title">

                <h1>
                    Gestion des Projets
                </h1>

                <p>
                    Supervisez l'avancement des projets
                    et les tableaux Kanban.
                </p>

            </div>


            <div className="kanban-header-actions">

                {/* SWITCHER */}

                <div className="view-switcher">

                    <button
                        className={
                            view === "projects"
                                ? "switcher-button active"
                                : "switcher-button"
                        }
                        onClick={() =>
                            onViewChange("projects")
                        }
                    >
                        <FiGrid />
                    </button>


                    <button
                        className={
                            view === "kanban"
                                ? "switcher-button active"
                                : "switcher-button"
                        }
                        onClick={() =>
                            onViewChange("kanban")
                        }
                    >
                        <FiList />
                    </button>

                </div>


                {/* NOUVEAU PROJET */}

                <button
                    className="new-project-button"
                    onClick={onCreateProject}
                >
                    <FiPlus />
                    Nouveau projet
                </button>

            </div>

        </div>
    );
}