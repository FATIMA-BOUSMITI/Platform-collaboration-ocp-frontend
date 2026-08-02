import PermissionRow from "./PermissionRow";
import type { Permission } from "../../../types/permission.type";
import type { Roles} from "../../../types/role.types";

import "../styles/PermissionSection.css";

interface Props {

    title: string;

    permissions: Permission[];

    roles: Roles[];

}

export default function PermissionSection({

    title,

    permissions,

    roles

}: Props) {

    return (

        <>

            <tr className="section-title">

                <td colSpan={roles.length + 1}>

                    {title}

                </td>

            </tr>

            {

                permissions.map(permission => (

                    <PermissionRow

                        key={permission.id}

                        permission={permission}

                        roles={roles}

                    />

                ))

            }

        </>

    );

}