import "../styles/RoleRow.css";

import type { UserRole } from "../../../types/role.types";

interface Props{

    user:UserRole;

    onEditRole:(user:UserRole)=>void;

}

export default function RoleRow({

    user,

    onEditRole

}:Props){

    const initials=

        `${user.firstName[0]}${user.lastName[0]}`;

    return(

        <tr>
            <td>
                <div className="user-cell">

                 <div className="avatar">
                    
                        {initials}

                    </div>

                    <div>

                        <h4>

                            {user.firstName} {user.lastName}

                        </h4>

                        <p>

                            {user.email}

                        </p>

                    </div>

                </div>

            </td>

            <td>

                {user.department}

            </td>

            <td>

                <span

                    className="role-badge"

                >

                    {user.role.name}

                </span>

            </td>

            <td>

                <span

                    className={`status ${user.enabled ? "active" : "inactive"}`}

                >

                    {

                        user.enabled

                        ?

                        "Actif"

                        :

                        "Inactif"

                    }

                </span>

            </td>

            <td>

                <button

                    className="edit-role-button"

                    onClick={()=>onEditRole?.(user)}

                >

                    Modifier le rôle

                </button>

            </td>

        </tr>

    );

}