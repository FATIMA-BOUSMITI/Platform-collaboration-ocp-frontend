import PermissionsHeader from "../components/PermissionsHeader";
import PermissionsMatrix from "../components/PermissionsMatrix";
import { useEffect, useState } from "react";
import type { Roles } from "../../../types/role.types";

import "../styles/PermissionsPage.css";
import { getRoles } from "../../../api/roleApi";
import type { Permission } from "../../../types/permission.type";
import { getPermissions, getRolePermissions } from "../../../api/permissionApi";



export default function PermissionsPage() {

  const [roles,setroles] = useState<Roles[]>([]);
  const [permissions,setpermissions] = useState<Permission[]>([]);
  const [rolePermissions, setRolePermissions] = useState<Record<string, Permission[]>>({});

  const loadRolePermissions = async (roles: Roles[]) => {
    const rolePermissionsMap: Record<string, Permission[]> = {};
    for (const role of roles) {
      try {
        const permissions = await getRolePermissions(role.id);
        rolePermissionsMap[role.id] = permissions;
      } catch (err) {
        console.error(`Failed to load permissions for role ${role.name}:`, err);
      }
      
    }
    setRolePermissions(rolePermissionsMap);
};


  useEffect(() => {
      const fetchRoles = async () => {
          try {
              const roles = await getRoles();
              setroles(roles);
              loadRolePermissions(roles);
          } catch (err) {
              console.error(err);
          }
        };
        const fetchPermissions = async () => {
          try {
              const permissions = await getPermissions();
              setpermissions(permissions);
          } catch (err) {
              console.error(err);
          }
        };
          fetchRoles();
          fetchPermissions();
    },[]);
  
     
    const handleSave = () => {
        console.log("Save");
    };

    const handlePermissionChange = (
    roleId: string,
    permission: Permission,
    checked: boolean
) => {

    setRolePermissions(prev => {

        const currentPermissions = prev[roleId] || [];

        const updatedPermissions = checked
            ? [...currentPermissions, permission]
            : currentPermissions.filter(
                  p => p.id !== permission.id
              );

        return {
            ...prev,
            [roleId]: updatedPermissions
        };

    });

};

    return (

        <div className="permissions-page">

        
     <PermissionsHeader onSave={handleSave}/>

            

            <PermissionsMatrix
                roles={roles}
                permissions={permissions}
                rolePermissions={rolePermissions}
                 onPermissionChange={handlePermissionChange}
            />

        </div>

    );

}