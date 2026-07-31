import type { UserRole } from "../../../types/role.types";
import RoleRow from "./RoleRow";

import "../styles/RolesTable.css";

interface Props {
    users: UserRole[];
    onEditRole?:(user: UserRole) => void;
}

export default function RolesTable({
    users,
    onEditRole
}: Props) {

    return (

        <div className="roles-table">

            <table>

                <thead>

                    <tr>

                        <th>UTILISATEUR</th>

                        <th>SERVICE</th>

                        <th>RÔLE</th>

                        <th>STATUT</th>

                        <th>ACTIONS</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        users.map(user => (

                            <RoleRow
                                key={user.id}
                                user={user}
                                onEditRole={(user)=>onEditRole?.(user)}
                            />

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}