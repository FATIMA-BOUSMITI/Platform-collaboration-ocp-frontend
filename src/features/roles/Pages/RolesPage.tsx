import { useEffect, useState } from "react";

import RolesHeader from "../components/RolesHeader";
import SearchBar from "../components/SearchBar";
import RolesTable from "../components/RolesTable";
import EditRoleModal from "../components/EditRoleModal";

import "../styles/RolesPage.css";

import type { Roles, UserRole} from "../../../types/role.types";
import { getUsers } from "../../../api/userApi";
import { mapUserToUserRole } from "../../../mappers";
import { getRoles, updateUserRole } from "../../../api/roleApi";




function RolesPage() {

  const [users, setUsers] = useState<UserRole[]>([]);

  const [selectedUser, setSelectedUser] = useState<UserRole | null>(null);

  const [selectedRoleId, setSelectedRoleId] = useState("");

  const [search, setSearch] = useState("");
  const [roles, setRoles] = useState<Roles[]>([]);

  useEffect(() => {

    async function fetchUsers() {

      try {

        const data = await getUsers();

        const usersForTable = data.map(mapUserToUserRole);

        setUsers(usersForTable);

      } catch (err) {

        console.error(err);

      }

    }

    fetchUsers();

  }, []);
  useEffect(()=>{
    const fetchRoles = async () => {
      try{
        const roles = await getRoles();
        setRoles(roles);
      }catch(err){
        console.error(err);
      }
    };
    fetchRoles();
  }, []);

  const usersFiltered = users.filter((user) => {

    const value = search.toLowerCase();

    return (

      user.firstName.toLowerCase().includes(value) ||

      user.lastName.toLowerCase().includes(value) ||

      user.email.toLowerCase().includes(value) ||

      user.department.toLowerCase().includes(value) ||

      user.role.name.toLowerCase().includes(value)

    );

  });

  const handleChange = (value: string) => {

    setSearch(value);

  };

  const handleEditRole = (user: UserRole) => {

    setSelectedUser(user);

    setSelectedRoleId(roles.find((role) => role.name === user.role.name)?.id || "");

  };
  const onSave = async()=>{
    if(selectedUser && selectedRoleId){
      try{
        await updateUserRole(selectedUser.id, selectedRoleId);  
        const data = await getUsers();
        const usersForTable = data.map(mapUserToUserRole);
        setUsers(usersForTable);

        setSelectedUser(null);

      }catch(err){
        console.error(err);
      }
    }
      
  };

  return (

    <div className="roles-page">

      <RolesHeader usersTotale={users.length} />

      <SearchBar

        value={search}

        onChange={handleChange}

      />

      <RolesTable

        users={usersFiltered}

        onEditRole={handleEditRole}

      />

      <EditRoleModal

        open={selectedUser !== null}

        user={selectedUser}

        roles={roles}

        selectedRoleId={selectedRoleId}

        onSelectRole={setSelectedRoleId}

        onSave={onSave}

        onClose={() => setSelectedUser(null)}

      />

    </div>

  );

}

export default RolesPage;