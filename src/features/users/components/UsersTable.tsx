import type { User } from "../../../types/User.type";
import UserRow from "./UserRow";

import "../styles/UsersTable.css";

interface Props {
  users: User[];
  onEditUser?: (user: User) => void;
  onDeleteUser?: (id: string) => void;
}

export default function UsersTable({
  users,
  onEditUser,
  onDeleteUser,
}: Props) {
  return (
    <div className="users-table">

      <table>

        <colgroup>
          <col className="user-column" />
          <col className="email-column" />
          <col className="department-column" />
          <col className="role-column" />
          <col className="status-column" />
          <col className="actions-column" />
        </colgroup>

        <thead>
          <tr>
            <th>Utilisateur</th>
            <th>Email</th>
            <th>Département</th>
            <th>Rôle</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              onEditUser={(user) =>
                onEditUser?.(user)
              }
              onDeleteUser={(id) =>
                onDeleteUser?.(id)
              }
            />
          ))}

          {users.length === 0 && (
            <tr data-testid="users-empty-state">
              <td colSpan={6}>Aucun utilisateur à afficher.</td>
            </tr>
          )}

        </tbody>

      </table>

    </div>
  );
}
