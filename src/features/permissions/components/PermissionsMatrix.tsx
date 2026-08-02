import "../styles/PermissionsMatrix.css";
import PermissionSection from "./PermissionSection";
import type { Permission } from "../../../types/permission.type";
import type { Roles } from "../../../types/role.types";


interface Props{

    roles: Roles[];

    permissions: Permission[];

}

export default function PermissionsMatrix({

    roles,

    permissions

}:Props){


    return (

        <div className="permissions-matrix">

            <table>

                <thead>

                    <tr>

                        <th className="permission-column">
                            Permission
                        </th>

                         {roles.map(role => (

                              <th key={role.id}>
                                  {role.name}
                                  </th>

                         ))}


                    </tr>

                </thead>

                
                   <tbody>

                       <PermissionSection title="Gestion des Utilisateurs" permissions={permissions} roles={roles}

/>

</tbody>
            

            </table>

        </div>

    );

}