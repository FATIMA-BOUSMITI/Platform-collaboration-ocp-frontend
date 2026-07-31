import "../styles/EditRoleModal.css";

import { MdClose } from "react-icons/md";
import type { UserRole, Role } from "../../../types/role.types";
import RoleOption from "./RoleOption";

interface Props {

    open: boolean;

    user: UserRole | null;

    roles: Role[];

    selectedRoleId: string;

    onSelectRole: (roleId: string) => void;

    onSave: () => void;

    onClose: () => void;

}

export default function EditRoleModal({

    open, user, roles, selectedRoleId, onSelectRole,onSave,onClose}: Props) {

    if (!open || !user) return null;

    return (

        <div className="modal-overlay">

            <div className="edit-role-modal">

                <div className="modal-header">

                    <h2>Modifier le rôle</h2>

                    <button onClick={onClose}>

                        <MdClose />

                    </button>

                </div>

                <div className="user-card">

                    <div className="avatar">

                        {user.firstName[0]}
                        {user.lastName[0]}

                    </div>

                    <div>

                        <h3>

                            {user.firstName} {user.lastName}

                        </h3>

                        <p>

                            {user.email}

                        </p>

                    </div>

                </div>

                <p className="label">

                    Sélectionner un rôle

                </p>

                <div className="roles-list">

                    {

                        roles.map(role => (

                            <RoleOption

                                key={role.id}

                                role={role}

                                selected={selectedRoleId === role.id}

                                onClick={() => onSelectRole(role.id)}

                            />

                        ))

                    }

                </div>

                <div className="modal-actions">

                    <button
                        className="save-button"
                        onClick={onSave}
                    >

                        Enregistrer

                    </button>

                    <button
                        className="cancel-button"
                        onClick={onClose}
                    >

                        Annuler

                    </button>

                </div>

            </div>

        </div>

    );

}