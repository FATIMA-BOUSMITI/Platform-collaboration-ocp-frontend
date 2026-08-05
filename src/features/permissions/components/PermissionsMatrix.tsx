import "../styles/PermissionsMatrix.css";
import PermissionSection from "./PermissionSection";
import type { Permission } from "../../../types/permission.type";
import type { Roles } from "../../../types/role.types";


interface Props{

    roles: Roles[];

    permissions: Permission[];

    rolePermissions: Record<string, Permission[]>;

    onPermissionChange: (
    roleId: string,
    permission: Permission,
    checked: boolean
) => void;

}

export default function PermissionsMatrix({

    roles,

    permissions ,

     rolePermissions,
     onPermissionChange

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

                      <PermissionSection
                    permissions={permissions}
                   roles={roles}
                  rolePermissions={rolePermissions}
                  onPermissionChange={onPermissionChange}
/>
</tbody>
            

            </table>

        </div>

    );

}