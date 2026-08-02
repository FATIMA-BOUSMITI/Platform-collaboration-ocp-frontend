import PermissionCheckbox from "./PermissionCheckbox";
import type { Roles} from "../../../types/role.types";

import "../styles/PermissionRow.css";
import type { Permission } from "../../../types/permission.type";

interface Props {

    permission: Permission;

    roles: Roles[];

}

export default function PermissionRow({

    permission,

    roles

}: Props) {

    return (

        <tr>

            <td className="permission-name">

                {permission.description}

            </td>

            {

                roles.map(role => (

                    <td
                        key={role.id}
                        className="permission-cell"
                    >

                        <PermissionCheckbox
                            checked={false}
                            onChange={() => console.log(permission.id, role.id)}
                        />

                    </td>

                ))

            }

        </tr>

    );

}