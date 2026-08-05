import PermissionCheckbox from "./PermissionCheckbox";
import type { Roles } from "../../../types/role.types";
import type { Permission } from "../../../types/permission.type";

import "../styles/PermissionRow.css";

interface Props {
    permission: Permission;
    roles: Roles[];
    rolePermissions: Record<string, Permission[]>;
    onPermissionChange: (
        roleId: string,
        permission: Permission,
        checked: boolean
    ) => void;
}

export default function PermissionRow({
    permission,
    roles,
    rolePermissions,
    onPermissionChange
    
}: Props) {

    return (

        <tr>

            <td className="permission-name">
                {permission.description}
            </td>

            {roles.map(role => {

                const checked =
                    rolePermissions[role.id]?.some(
                        p => p.id === permission.id
                    ) ?? false;

               
                return (

                    <td
                        key={role.id}
                        className="permission-cell"
                    >

                       <PermissionCheckbox
                     checked={checked}
                     onChange={(checked) =>
                       onPermissionChange(
                            role.id,
                         permission,
                           checked
        )
    }
/>

                    </td>

                );

            })}

        </tr>

    );

}