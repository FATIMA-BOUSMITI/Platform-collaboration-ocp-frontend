
import "../styles/UserRow.css";

import type { User } from "../../../types/User.type";
import {
  FiMoreVertical,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import { useEffect, useRef, useState } from "react";

interface Props {
  user: User;
  onEditUser: (user: User) => void;
  onDeleteUser?: (id: string) => void;
}

export default function UserRow({
  user,
  onEditUser,
  onDeleteUser,
}: Props) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const fullName =
    `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();

  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  const handleEdit = () => {
    setOpenMenu(null);
    onEditUser(user);
  };

  const handleDelete = () => {
    if(!window.confirm("Supprimer cet utilisateur ? Cette action est définitive."))return;
    setOpenMenu(null);

    if (onDeleteUser) {
      onDeleteUser(user.id);
    }
  };

  const normalizedRoles = Array.isArray(user.roles)
    ? user.roles.map((role) => role.name).filter(Boolean)
    : user.roles && typeof user.roles === "object" && "name" in user.roles
      ? [String((user.roles as { name?: string }).name ?? "")].filter(Boolean)
      : Array.isArray(user.roleNames)
        ? user.roleNames.filter(Boolean)
        : [];

  const roleDisplay = normalizedRoles.length > 0 ? normalizedRoles.join(", ") : "Aucun rôle";

  return (
    <tr data-testid="user-row">
      {/* Utilisateur */}
      <td>
        <div className="user-cell">
          <div className="avatar">
            {initials}
          </div>

          <div className="user-details">
            <h4 title={fullName}>{fullName}</h4>
            <p title={user.email}>{user.email}</p>
          </div>
        </div>
      </td>

      {/* Email */}
      <td
        className="email-cell"
        title={user.email}
        data-testid="user-email"
      >
        {user.email}
      </td>

      {/* Département */}
      <td>
        {user.departement?.name ?? "Sans département"}
      </td>

      {/* Rôle */}
      <td>
        <span className="role-badge">
          {roleDisplay}
        </span>
      </td>

      {/* Statut */}
      <td>
        <span className={"status " + (user.enabled && !user.accountLocked ? "active" : "inactive")}>
          {user.accountLocked ? "Verrouillé" : user.enabled === true ? "Actif" : user.enabled === false ? "Désactivé" : "Indisponible"}
        </span>
      </td>

      {/* Actions */}
      <td className="actions-cell">
        <div
          className="action-menu"
          ref={menuRef}
        >

          <button
            type="button"
            className="more-button"
            data-testid="user-row-actions"
            onClick={() =>
              setOpenMenu(
                openMenu === user.id
                  ? null
                  : user.id
              )
            }
          >
            <FiMoreVertical size={20} />
          </button>

          {openMenu === user.id && (
            <div className="action-dropdown">

              <button
                type="button"
                data-testid="edit-user-action"
                onClick={handleEdit}
              >
                <FiEdit2 size={16} />
                <span>Modifier</span>
              </button>

              <button
                type="button"
                className="delete-action"
                data-testid="delete-user-action"
                onClick={handleDelete}
              >
                <FiTrash2 size={16} />
                <span>Supprimer</span>
              </button>

            </div>
          )}

        </div>
      </td>
    </tr>
  );
}
