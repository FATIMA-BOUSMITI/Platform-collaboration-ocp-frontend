import PermissionsHeader from "../components/PermissionsHeader";
import PermissionsMatrix from "../components/PermissionsMatrix";

import "../styles/PermissionsPage.css";
const roles = [
  {
    id: "1",
    name: "ADMIN",
    description: "Administrateur",
    permissions: []
  },
  {
    id: "2",
    name: "MANAGER",
    description: "Chef de projet",
    permissions: []
  },
  {
    id: "3",
    name: "EMPLOYEE",
    description: "Employé",
    permissions: []
  }
];

const permissions = [
  {
    id: "1",
    name: "USER_CREATE",
    description: "Créer utilisateur",
    resource: "Gestion des Utilisateurs",
    action: "Créer"
  },
  {
    id: "2",
    name: "USER_READ",
    description: "Lire utilisateur",
    resource: "Gestion des Utilisateurs",
    action: "Lire"
  },
  {
    id: "3",
    name: "USER_UPDATE",
    description: "Modifier utilisateur",
    resource: "Gestion des Utilisateurs",
    action: "Modifier"
  },
  {
    id: "4",
    name: "USER_DELETE",
    description: "Supprimer utilisateur",
    resource: "Gestion des Utilisateurs",
    action: "Supprimer"
  }
];

export default function PermissionsPage() {

    const handleSave = () => {
        console.log("Save");
    };

    return (

        <div className="permissions-page">

            <PermissionsHeader
                onSave={handleSave}
            />

            <PermissionsMatrix
                roles={roles}
                permissions={permissions}
            />

        </div>

    );

}