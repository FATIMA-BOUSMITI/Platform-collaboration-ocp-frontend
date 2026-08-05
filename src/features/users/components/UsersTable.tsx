import type { User } from "../../../types/User.type";
import UserRow from "./UserRow";

import "../styles/UsersTable.css";

interface Props {
    users: User[];
    onEditUser?: (user: User) => void;
}

export default function UsersTable({
    users,
    onEditUser,
}: Props) {

    return (

        <div className="users-table">

            <table>

                <thead>

                    <tr>

                        <th>Utilisateur</th>

                        <th>EMAIL</th>

                        <th>RÔLE</th>

                        <th>STATUT</th>

                        <th>ACTIONS</th>

                    </tr>

                </thead>

                <tbody>

                    {users.map((user) => (

                        <UserRow
                            key={user.id}
                            user={user}
                            onEditUser={(user) => onEditUser?.(user)}
                        />

                    ))}

                </tbody>

            </table>

        </div>

    );

}