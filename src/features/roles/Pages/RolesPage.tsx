import RolesHeader from "../components/RolesHeader";
import SearchBar from "../components/SearchBar";
import "../styles/RolesPage.css"
import RolesTable from "../components/RolesTable";
import EditRoleModal from "../components/EditRoleModal";
import { useState } from "react";
import type { UserRole } from "../../../types/role.types";

const usersrole=[
  {
    id: "1",
    firstName: "Ahmed",
    lastName: "Derif",
    email: "ahmed.derif@ocpgroup.ma",
    department: "Direction IT",
    enabled: true,
    role: {
      id: "r1",
      name: "ADMIN",
      description: "Administrateur",
      color: "#15803D",
      usersCount: 1,
    },
  },

  {
    id: "2",
    firstName: "Fatima",
    lastName: "El Ankoud",
    email: "fatima.elankoud@ocpgroup.ma",
    department: "Développement",
    enabled: true,
    role: {
      id: "r2",
      name: "CHEF DE PROJET",
      description: "Chef de Projet",
      color: "#2563EB",
      usersCount: 2,
    },
  },

  {
    id: "3",
    firstName: "Sara",
    lastName: "Bennani",
    email: "sara.bennani@ocpgroup.ma",
    department: "Finance",
    enabled: true,
    role: {
      id: "r3",
      name: "DIRECTEUR",
      description: "Directeur",
      color: "#D97706",
      usersCount: 1,
    },
  },

  {
    id: "4",
    firstName: "Youssef",
    lastName: "Tazi",
    email: "youssef.tazi@ocpgroup.ma",
    department: "Production",
    enabled: true,
    role: {
      id: "r4",
      name: "EMPLOYÉ",
      description: "Employé",
      color: "#6B7280",
      usersCount: 4,
    },
  },

  {
    id: "5",
    firstName: "Imane",
    lastName: "El Amrani",
    email: "imane.elamrani@ocpgroup.ma",
    department: "RH",
    enabled: false,
    role: {
      id: "r4",
      name: "EMPLOYÉ",
      description: "Employé",
      color: "#6B7280",
      usersCount: 4,
    },
  },
];

const roles = [
  {
    id: "r1",
    name: "ADMIN",
    description: "Administrateur",
    color: "#15803D",
  },
  {
    id: "r2",
    name: "DIRECTEUR",
    description: "Directeur",
    color: "#D97706",
  },
  {
    id: "r3",
    name: "CHEF DE PROJET",
    description: "Chef de Projet",
    color: "#2563EB",
  },
  {
    id: "r4",
    name: "EMPLOYÉ",
    description: "Employé",
    color: "#6B7280",
  },
  {
    id: "r5",
    name: "STAGIAIRE",
    description: "Accès restreint",
    color: "#9CA3AF",
  },
];




function RolesPage(){

const [selectedUser, setSelectedUser] = useState<UserRole | null>(null);
const [selectedRoleId, setSelectedRoleId] = useState("");
const [search,setsearch]=useState("");
const usersfiltred= usersrole.filter((user)=>{

  return(
  user.lastName.toLowerCase().includes(search)||
  user.firstName.toLowerCase().includes(search)||
  user.lastName.toUpperCase().includes(search)||
  user.firstName.toUpperCase().includes(search)||
  user.lastName.includes(search)|| user.firstName.includes(search)

 
);
});
const handlChange=(value:string)=>{

    setsearch(value);
  
}
const handleEditRole = (user: UserRole) => {
    setSelectedUser(user);
    setSelectedRoleId(user.role.id);
};



    return(
        <div className="roles-page">

         <RolesHeader  usersTotale={usersrole.length}/>
         <SearchBar value={search} onChange={handlChange}/>
         <RolesTable users={usersfiltred} onEditRole={handleEditRole}/>

          <EditRoleModal
           open={selectedUser !== null}
           user={selectedUser}
           roles={roles}
           selectedRoleId={selectedRoleId}
           onSelectRole={setSelectedRoleId}
           onSave={() => {
             console.log(selectedRoleId);
                 setSelectedUser(null);}}
          onClose={() => setSelectedUser(null)}
/>
        </div>

    );

}
export default RolesPage ;