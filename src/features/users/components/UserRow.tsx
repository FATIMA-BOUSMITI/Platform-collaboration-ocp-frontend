import "../styles/UserRow.css";

import type { User } from "../../../types/User.type";

interface Props {
  user: User;
  onEditUser: (user: User) => void;
}

export default function UserRow({
  user,
  onEditUser,
}: Props) {

  const initials = user.fullName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  return (
    <tr>

      <td>

        <div className="user-cell">

          <div className="avatar">
            {initials}
          </div>

          <div>

            <h4>{user.fullName}</h4>

            <p>{user.email}</p>

          </div>

        </div>

      </td>

      <td>

        <span className="role-badge">

          {user.role}

        </span>

      </td>

      <td>

        <span
          className={`status ${
            user.status === "ACTIF" ? "active" : "inactive"
          }`}
        >
          {user.status === "ACTIF" ? "Actif" : "Inactif"}
        </span>

      </td>

      <td>

        <button
          className="edit-role-button"
          onClick={() => onEditUser(user)}
        >
          Modifier
        </button>

      </td>

    </tr>
  );
}