import axios from "axios";
import api from "../../api/axiosClient";
import { errorMessage } from "../../api/adminApi";
import { useEffect, useState } from "react";
import DashboardHeader from "../dashboard/components/DashboardHeader";
import { deleteUser, getUsers } from "../../api/userApi";
import SearchBar from "./components/SearchBar";

import UsersTable from "./components/UsersTable";
import CreateUserModal from "./components/CreateUserModal";
import EditUserModal from "./components/EditUserModal";
import type { User } from "../../types/User.type";
import "./UsersPage.css";

function UsersPage() {

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const [search, setSearch] = useState("");
 const [status,setStatus]=useState("");
 const [sort,setSort]=useState("name");
 const [page,setPage]=useState(1);
 const [pending,setPending]=useState("");

  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleteStatus, setDeleteStatus] = useState<number | null>(null);

  // Modal création
  const [openModal, setOpenModal] = useState(false);

  // Modal modification
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openEditModal, setOpenEditModal] = useState(false);


  // =========================
  // GET USERS
  // =========================

  useEffect(() => {
    let isCurrent = true;
    const startedAt = performance.now();
    console.info("Loading users list from API");

    getUsers()
      .then((data) => {
        if (!isCurrent) {
          return;
        }
        console.log("UTILISATEURS RECUS :", data);
        setUsers(data);
        setLoadError(false);
        console.info("Users list loaded", {
          count: data.length,
          durationMs: Math.round(performance.now() - startedAt),
        });
      })
      .catch((error: unknown) => {
        if (!isCurrent) {
          return;
        }
        setLoadError(true);
        console.error("Users list request failed", {
          httpStatus: axios.isAxiosError(error)
            ? error.response?.status ?? null
            : null,
          code: axios.isAxiosError(error) ? error.code ?? null : null,
          durationMs: Math.round(performance.now() - startedAt),
        });
      })
      .finally(() => {
        if (isCurrent) {
          setLoading(false);
          console.info("Users list request settled", {
            durationMs: Math.round(performance.now() - startedAt),
          });
        }
      });

    return () => {
      isCurrent = false;
    };
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
    getUsers().then(setUsers).catch(()=>setDeleteError("Utilisateur créé, mais la liste n’a pas pu être actualisée. Rechargez la page."));
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
    getUsers().then(setUsers).catch(()=>setDeleteError("Utilisateur modifié, mais la liste n’a pas pu être actualisée. Rechargez la page."));
  };

  const handleDeleteUser = async (id: string) => {
    setDeleteError(null);
    setDeleteStatus(null);
    console.info("User deletion requested");

    try {
      const status = await deleteUser(id);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      setDeleteStatus(status);
      console.info("User deletion confirmed by API", { status });
    } catch (error) {
      const status = axios.isAxiosError(error)
        ? error.response?.status
        : undefined;
      const failureMessage = status === undefined
        ? "La suppression a échoué avant de recevoir une réponse HTTP."
        : `La suppression a échoué (HTTP ${status}). L'utilisateur est toujours présent.`;
      setDeleteError(failureMessage);
      console.error("User deletion failed", { httpStatus: status ?? null });
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

    if(status==="active" && (!user.enabled || user.accountLocked))return false;
    if(status==="disabled" && user.enabled!==false)return false;
    if(status==="locked" && !user.accountLocked)return false;
    return (
      fullName.includes(searchValue) ||
      email.includes(searchValue) ||
      position.includes(searchValue) ||
      hasRole
    );

  });



  filteredUsers.sort((a,b)=>(sort==="email"?a.email:(a.firstName+" "+a.lastName)).localeCompare(sort==="email"?b.email:(b.firstName+" "+b.lastName),"fr"));
  const totalPages=Math.max(1,Math.ceil(filteredUsers.length/10));
  const currentPage=Math.min(page,totalPages);
  const visibleUsers=filteredUsers.slice((currentPage-1)*10,currentPage*10);
  async function changeStatus(user:User,action:string){
    if(pending)return;setPending(user.id);setDeleteError(null);
    try{if(action==="reset"){await api.post("/auth/forgot-password",{email:user.email});setDeleteStatus(null);window.alert("La demande de lien de définition du mot de passe a été envoyée.");return;}await api.put("/auth/users/"+(user.userId||user.id),action==="unlock"?{accountLocked:false}:{enabled:!user.enabled});setUsers(await getUsers());}
    catch(error){setDeleteError(errorMessage(error));}finally{setPending("");}
  }
  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <p data-testid="users-loading" data-users-state="loading">
        Chargement des utilisateurs...
      </p>
    );
  }

  if (loadError) {
    return (
      <div className="users-page" data-users-state="error">
        <p role="alert" data-testid="user-list-error">
          Impossible de charger la liste des utilisateurs.
        </p>
      </div>
    );
  }


  // =========================
  // JSX
  // =========================

  return (
    <div
      className="users-page"
      data-testid="users-page-ready"
      data-users-state="ready"
    >

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
            onChange={value=>{setSearch(value);setPage(1);}}
          />


          <label>Statut <select value={status} onChange={e=>{setStatus(e.target.value);setPage(1);}}><option value="">Tous</option><option value="active">Actifs</option><option value="disabled">Désactivés</option><option value="locked">Verrouillés</option></select></label>
          <label>Trier par <select value={sort} onChange={e=>{setSort(e.target.value);setPage(1);}}><option value="name">Nom</option><option value="email">Email</option></select></label>

        </div>


        <UsersTable
          users={visibleUsers}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
        />


      </div>
      <div className="admin-pagination"><button disabled={currentPage<=1} onClick={()=>setPage(currentPage-1)}>Précédent</button><span>{filteredUsers.length} utilisateur(s) · Page {currentPage}/{totalPages}</span><button disabled={currentPage>=totalPages} onClick={()=>setPage(currentPage+1)}>Suivant</button></div>
      <details className="admin-card"><summary>Activation et déverrouillage des comptes</summary><div className="admin-table-wrap"><table><thead><tr><th>Compte</th><th>Accès</th><th>Verrouillage</th><th>Mot de passe</th></tr></thead><tbody>{visibleUsers.map(user=><tr key={user.id}><td>{user.email}</td><td><button disabled={!!pending||user.enabled===undefined} onClick={()=>void changeStatus(user,"toggle")}>{user.enabled?"Désactiver":"Activer"}</button></td><td><button disabled={!!pending||!user.accountLocked} onClick={()=>void changeStatus(user,"unlock")}>Déverrouiller</button></td><td><button disabled={!!pending} onClick={()=>void changeStatus(user,"reset")}>Envoyer un lien</button></td></tr>)}</tbody></table></div></details>

      {deleteError !== null && (
        <p role="alert" data-testid="user-delete-error">
          {deleteError}
        </p>
      )}

      {deleteStatus !== null && (
        <p role="status" data-testid="user-delete-status">
          Suppression confirmée par l'API (HTTP {deleteStatus}).
        </p>
      )}


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