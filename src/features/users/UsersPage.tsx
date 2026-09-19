import { useEffect, useState } from "react";
import DashboardHeader from "../dashboard/components/DashboardHeader";
import { deleteUser, getUsers } from "../../api/userApi";
import SearchBar from "./components/SearchBar";
import FilterButton from "./components/FilterButton";
import UsersTable from "./components/UsersTable";
import CreateUserModal from "./components/CreateUserModal";
import EditUserModal from "./components/EditUserModal";
import type { User } from "../../types/User.type";
import "./UsersPage.css";

function UsersPage() {

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  // Modal création
  const [openModal, setOpenModal] = useState(false);

  // Modal modification
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openEditModal, setOpenEditModal] = useState(false);


  // =========================
  // GET USERS
  // =========================

  const fetchUsers = async () => {

    try {

      setLoading(true);

      const data = await getUsers();

      console.log("UTILISATEURS RECUS :", data);

      setUsers(data);

    } catch (error) {

      console.error(
        "Erreur récupération utilisateurs :",
        error
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    fetchUsers();

  }, []);


  // =========================
  // USER CREATED
  // =========================

  const handleUserCreated = (newUser: User) => {

    console.log(
      "NOUVEL UTILISATEUR CRÉÉ :",
      newUser
    );

    setUsers((prevUsers) => [
      ...prevUsers,
      newUser
    ]);

    setOpenModal(false);
  };


  // =========================
  // EDIT USER
  // =========================

  const handleEditUser = (user: User) => {

    console.log(
      "UTILISATEUR À MODIFIER :",
      user
    );

    setSelectedUser(user);
    setOpenEditModal(true);
  };


  // =========================
  // USER UPDATED
  // =========================

  const handleUserUpdated = (updatedUser: User) => {

    console.log(
      "UTILISATEUR MODIFIÉ :",
      updatedUser
    );

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === updatedUser.id
          ? updatedUser
          : user
      )
    );

    setOpenEditModal(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Erreur suppression utilisateur:", error);
    }
  };


  // =========================
  // SEARCH
  // =========================

  const filteredUsers = users.filter((user) => {

    const searchValue = search.toLowerCase();

    const fullName =
      `${user.firstName ?? ""} ${user.lastName ?? ""}`
        .toLowerCase();

    const email =
      user.email?.toLowerCase() ?? "";

    const position =
      user.position?.toLowerCase() ?? "";

    const hasRole =
      Array.isArray(user.roles) &&
      user.roles.some((role) =>
        role.name
          .toLowerCase()
          .includes(searchValue)
      );

    return (
      fullName.includes(searchValue) ||
      email.includes(searchValue) ||
      position.includes(searchValue) ||
      hasRole
    );

  });


  // =========================
  // LOADING
  // =========================

  if (loading) {
    return <p>Chargement des utilisateurs...</p>;
  }


  // =========================
  // JSX
  // =========================

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
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
        />

      </div>


      {/* =========================
          CREATE MODAL
          ========================= */}

      <CreateUserModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onUserCreated={handleUserCreated}
      />


      {/* =========================
          EDIT MODAL
          ========================= */}

      {selectedUser && (
        <EditUserModal
          open={openEditModal}
          user={selectedUser}
          onClose={() => {
            setOpenEditModal(false);
            setSelectedUser(null);
          }}
          onUserUpdated={handleUserUpdated}
        />
      )}

    </div>
  );
}

export default UsersPage;