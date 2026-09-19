import { useState } from "react";
import { FiX } from "react-icons/fi";

import type { Project } from "../types/Project.Types";

import "../styles/CreateProjectModal.css";

interface Props {

    onClose: () => void;

    onCreate: (project: Project) => void | Promise<void>;
}

export default function CreateProjectModal({
    onClose,
    onCreate
}: Props) {

    const [name, setName] = useState("");
    const [manager, setManager] = useState("");
    const [deadline, setDeadline] = useState("");
    const [department, setDepartment] = useState("");
    const [description, setDescription] = useState("");


    const handleSubmit = (
        e: React.FormEvent
    ) => {

        e.preventDefault();


        if (
            !name ||
            !manager ||
            !deadline ||
            !department
        ) {
            return;
        }


        const project: Project = {

            id: crypto.randomUUID(),

            name,

            manager,

            deadline,

            department,

            description,

            progress: 0,

            membersCount: 0
        };


        onCreate(project);
    };


    return (

        <div
            className="project-modal-overlay"
            onClick={onClose}
        >

            <div
                className="project-modal"
                onClick={(e) =>
                    e.stopPropagation()
                }
            >

                {/* HEADER */}

                <div className="project-modal-header">

                    <h2>
                        Créer un projet
                    </h2>

                    <button
                        onClick={onClose}
                        className="close-modal-button"
                    >
                        <FiX />
                    </button>

                </div>


                {/* FORM */}

                <form
                    onSubmit={handleSubmit}
                    className="project-form"
                >

                    <div className="form-group">

                        <label>
                            Nom du projet
                        </label>

                        <input
                            type="text"
                            placeholder="Ex: Refonte du portail RH"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                        />

                    </div>


                    <div className="form-row">

                        <div className="form-group">

                            <label>
                                Chef de projet
                            </label>

                            <select
                                value={manager}
                                onChange={(e) =>
                                    setManager(e.target.value)
                                }
                            >

                                <option value="">
                                    Sélectionner
                                </option>

                                <option value="Youssef El Fassi">
                                    Youssef El Fassi
                                </option>

                                <option value="Ahmed Darif">
                                    Ahmed Darif
                                </option>

                            </select>

                        </div>


                        <div className="form-group">

                            <label>
                                Date limite
                            </label>

                            <input
                                type="date"
                                value={deadline}
                                onChange={(e) =>
                                    setDeadline(e.target.value)
                                }
                            />

                        </div>

                    </div>


                    <div className="form-group">

                        <label>
                            Département concerné
                        </label>

                        <select
                            value={department}
                            onChange={(e) =>
                                setDepartment(e.target.value)
                            }
                        >

                            <option value="">
                                Sélectionner
                            </option>

                            <option value="IT">
                                IT
                            </option>

                            <option value="RH">
                                Ressources Humaines
                            </option>

                            <option value="Finance">
                                Finance
                            </option>

                            <option value="Production">
                                Production
                            </option>

                        </select>

                    </div>


                    <div className="form-group">

                        <label>
                            Description
                        </label>

                        <textarea
                            placeholder="Objectifs du projet"
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                        />

                    </div>


                    {/* FOOTER */}

                    <div className="project-modal-footer">

                        <button
                            type="button"
                            className="cancel-button"
                            onClick={onClose}
                        >
                            Annuler
                        </button>


                        <button
                            type="submit"
                            className="create-button"
                        >
                            Créer le projet
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}