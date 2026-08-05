import { useState } from "react";

import DashboardHeader from "../dashboard/components/DashboardHeader";

import SearchBar from "./components/SearchBar";
import FilterButton from "./components/FilterButton";
import UsersTable from "./components/UsersTable";
import CreateUserModal from "./components/CreateUserModal";

import type { User } from "../../types/User.type";

import "./UsersPage.css";

const users: User[] = [
  {
    id: 1,
    fullName: "Fatima Bousmiti",
    email: "fatima@ocp.ma",
    role: "Administrateur",
    status: "ACTIF",
  },
  {
    id: 2,
    fullName: "Ahmed Benali",
    email: "ahmed@ocp.ma",
    role: "Manager",
    status: "INACTIF",
  },
];

function UsersPage() {
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="users-page">

      <div className="users-top">

        <DashboardHeader
          title="Gestion des utilisateurs"
          subtitle="Gérez les accès et les profils des collaborateurs de l'OCP."
        />

        <button
          className="add-user-button"
          onClick={() => setOpenModal(true)}
        >
          + Ajouter un nouvel utilisateur
        </button>

      </div>

      <div className="users-card">

        <div className="users-toolbar">

          <SearchBar
            value={search}
            onChange={setSearch}
          />

          <FilterButton />

        </div>

        <UsersTable
          users={filteredUsers}
          onEditUser={(user) => console.log(user)}
        />

      </div>

      <CreateUserModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />

    </div>
  );
}

export default UsersPage;