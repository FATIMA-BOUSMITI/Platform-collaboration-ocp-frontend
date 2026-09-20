import { useEffect, useState } from "react";

import type {
    KanbanTask,
    TaskPriority,
    TaskStatus
} from "../types/kanban.types";

import "../styles/TaskModal.css";


interface Props {

    task: KanbanTask | null;

    status: TaskStatus;

    onClose: () => void;

    onCreate: (
        title: string,
        description: string,
        priority: TaskPriority,
        assignee: string
    ) => void;

    onUpdate: (
        task: KanbanTask
    ) => void;
}


export default function TaskModal({

    task,

    status,

    onClose,

    onCreate,

    onUpdate

}: Props) {


    const [title, setTitle] =
        useState("");

    const [description, setDescription] =
        useState("");

    const [priority, setPriority] =
        useState<TaskPriority>("MEDIUM");

    const [assignee, setAssignee] =
        useState("YE");


    useEffect(() => {

        if (task) {

            setTitle(task.title);

            setDescription(
                task.description ?? ""
            );

            setPriority(task.priority);

            setAssignee(task.assignee);

        } else {

            setTitle("");

            setDescription("");

            setPriority("MEDIUM");

            setAssignee("YE");

        }

    }, [task]);


    const getStatusLabel = () => {

        if (status === "TODO") {
            return "À faire";
        }

        if (status === "IN_PROGRESS") {
            return "En cours";
        }

        return "Terminé";
    };


    const handleSubmit = (
        e: React.FormEvent
    ) => {

        e.preventDefault();


        if (!title.trim()) {

            return;

        }


        if (task) {

            onUpdate({

                ...task,

                title: title.trim(),

                description:

                    description.trim(),

                priority,

                assignee

            });

        } else {

            onCreate(

                title.trim(),

                description.trim(),

                priority,

                assignee

            );

        }

    };


    return (

        <div
            className="modal-overlay"

            onMouseDown={onClose}
        >

            <div

                className="task-modal"

                onMouseDown={e =>
                    e.stopPropagation()
                }
            >

                <div className="modal-header">

                    <h2>

                        {task
                            ? "Modifier la tâche"
                            : "Nouvelle tâche"
                        }

                    </h2>


                    <button

                        type="button"

                        className="modal-close"

                        onClick={onClose}

                    >
                        ×

                    </button>

                </div>


                <form
                    onSubmit={handleSubmit}
                >

                    <div className="form-group">

                        <label>
                            Titre
                        </label>

                        <input

                            type="text"

                            value={title}

                            placeholder="Nom de la tâche"

                            onChange={e =>
                                setTitle(
                                    e.target.value
                                )
                            }

                            autoFocus

                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Description
                        </label>

                        <textarea

                            value={description}

                            placeholder="Description de la tâche"

                            onChange={e =>
                                setDescription(
                                    e.target.value
                                )
                            }

                        />

                    </div>


                    <div className="form-row">

                        <div className="form-group">

                            <label>
                                Priorité
                            </label>

                            <select

                                value={priority}

                                onChange={e =>
                                    setPriority(
                                        e.target.value as TaskPriority
                                    )
                                }

                            >

                                <option value="LOW">
                                    Low
                                </option>

                                <option value="MEDIUM">
                                    Medium
                                </option>

                                <option value="HIGH">
                                    High
                                </option>

                            </select>

                        </div>


                        <div className="form-group">

                            <label>
                                Responsable
                            </label>

                            <select

                                value={assignee}

                                onChange={e =>
                                    setAssignee(
                                        e.target.value
                                    )
                                }

                            >

                                <option value="YE">
                                    YE
                                </option>

                                <option value="KT">
                                    KT
                                </option>

                                <option value="AD">
                                    AD
                                </option>

                            </select>

                        </div>

                    </div>


                    <div className="form-group">

                        <label>
                            Statut
                        </label>

                        <div className="status-display">

                            {getStatusLabel()}

                        </div>

                    </div>


                    <div className="modal-actions">

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

                            {task
                                ? "Enregistrer"
                                : "Créer"
                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}