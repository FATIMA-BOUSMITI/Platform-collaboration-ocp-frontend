import type { Project } from "../types/Project.Types";

import "../styles/ProjectCard.css";

interface Props {
    project: Project;
}

export default function ProjectCard({ project }: Props) {

    return (
        <div className="project-card">

            {/* Header */}
            <div className="project-card-header">

                <h2>
                    {project.name}
                </h2>

                <span className="project-department">
                    {project.department}
                </span>

            </div>


            {/* Description */}
            <p className="project-description">
                {project.description}
            </p>


            {/* Manager */}
            <div className="project-info">

                <span className="project-info-label">
                    Responsable
                </span>

                <span className="project-info-value">
                    {project.manager}
                </span>

            </div>


            {/* Deadline */}
            <div className="project-info">

                <span className="project-info-label">
                    Échéance
                </span>

                <span className="project-info-value">
                    {project.deadline}
                </span>

            </div>


            {/* Progression */}
            <div className="project-progress">

                <div className="project-progress-header">

                    <span>
                        Progression
                    </span>

                    <span>
                        {project.progress}%
                    </span>

                </div>

                <div className="progress-bar">

                    <div
                        className="progress-bar-fill"
                        style={{
                            width: `${project.progress}%`
                        }}
                    />

                </div>

            </div>


            {/* Footer */}
            <div className="project-card-footer">

                <span>
                    👥 {project.membersCount} membres
                </span>

                <button
                    className="project-view-button"
                    type="button"
                >
                    Voir le projet →
                </button>

            </div>

        </div>
    );
}