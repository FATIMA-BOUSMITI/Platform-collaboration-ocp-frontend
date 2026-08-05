import PermissionRow from "./PermissionRow";
import type { Permission } from "../../../types/permission.type";
import type { Roles} from "../../../types/role.types";

import "../styles/PermissionSection.css";



   
    interface Props {

    permissions: Permission[];

    roles: Roles[];

    rolePermissions: Record<string, Permission[]>;

    onPermissionChange: (
        roleId: string,
        permission: Permission,
        checked: boolean
    ) => void;
}



export default function PermissionSection({


    permissions,

    roles,

    rolePermissions,
    onPermissionChange

}: Props) {

    return (

        <>

            {/* <tr className="section-title">

               <td colSpan={roles.length + 1}>

                    {title}

                </td> </tr>*/}

            {

                permissions.map(permission => (

                    <PermissionRow

                        key={permission.id}

                        permission={permission}

                        roles={roles}
                        
                        rolePermissions={rolePermissions}
                         onPermissionChange={onPermissionChange}

                    />

                ))

            }

        </>

    );

}