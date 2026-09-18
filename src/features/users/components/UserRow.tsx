
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
    <tr>
      {/* Utilisateur */}
      <td>
        <div className="user-cell">
          <div className="avatar">
            {initials}
          </div>

          <div>
            <h4>{fullName}</h4>
            <p>{user.email}</p>
          </div>
        </div>
      </td>

      {/* Email */}
      <td>{user.email}</td>

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
        <span className="status active">
          Actif
        </span>
      </td>

      {/* Actions */}
      <td className="actions-cell">
        <div
          className="action-menu"
          ref={menuRef}
          onMouseLeave={() => setOpenMenu(null)}
        >

          <button
            type="button"
            className="more-button"
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
                onClick={handleEdit}
              >
                <FiEdit2 size={16} />
                <span>Modifier</span>
              </button>

              <button
                type="button"
                className="delete-action"
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
