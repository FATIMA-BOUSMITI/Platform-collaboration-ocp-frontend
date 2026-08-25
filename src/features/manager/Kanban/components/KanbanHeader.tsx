import { FiPlus, FiGrid, FiList } from "react-icons/fi";

import "../styles/ManagerKanbanPage.css";

export default function KanbanHeader() {

    return (
        <div className="kanban-header">

            <div>
                <h1>Gestion des Projets</h1>

                <p>
                    Supervisez l'avancement des projets et les tableaux Kanban.
                </p>
            </div>

            <div className="kanban-header-actions">

                <div className="view-switcher">

                    <button>
                        <FiGrid />
                    </button>

                    <button>
                        <FiList />
                    </button>

                </div>

                <button className="new-project-button">
                    <FiPlus />
                    Nouveau projet
                </button>

            </div>

        </div>
    );
}