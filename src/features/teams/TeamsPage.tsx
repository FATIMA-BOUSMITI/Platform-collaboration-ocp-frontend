import { useEffect, useRef, useState } from "react";
import { FaUsers } from "react-icons/fa6";
import DashboardHeader from "../dashboard/components/DashboardHeader";
import CreateTeamModal from "./components/CreateTeamModal";
import "./TeamsPage.css";

type Team = {
  id: string;
  name: string;
  department: string;
  chief: string;
  members: number;
  active: boolean;
  objective?: string;
  users: string[];
};

const initialTeams: Team[] = [
  {
    id: "1",
    name: "Equipe Sécurité Opérationnelle",
    department: "IT & Cybersécurité",
    chief: "Omar Chaibri",
    members: 8,
    active: true,
    objective: "Sécuriser les opérations critiques.",
    users: ["OS", "CM", "AB", "TR"],
  },
  {
    id: "2",
    name: "Développement Backend",
    department: "IT & Cybersécurité",
    chief: "Hassan Alaoui",
    members: 12,
    active: true,
    objective: "Maintenir les services backend.",
    users: ["HA", "LM", "RK", "SB", "NY"],
  },
  {
    id: "3",
    name: "Audit Financier",
    department: "Finance & Stratégie",
    chief: "Meryem Bennani",
    members: 5,
    active: true,
    objective: "Contrôler les performances financières.",
    users: ["MB", "AL", "FH"],
  },
  {
    id: "4",
    name: "Support RH",
    department: "Ressources Humaines",
    chief: "Nadia Fassi",
    members: 15,
    active: true,
    objective: "Accompagner le personnel et la culture d’entreprise.",
    users: ["NF", "SK", "ID", "TH", "RA", "OM"],
  },
  {
    id: "5",
    name: "Maintenance Industrielle",
    department: "Production & Opérations",
    chief: "Youssef El Fassi",
    members: 45,
    active: true,
    objective: "Assurer la continuité des opérations industrielles.",
    users: ["YE", "AD", "ST", "RN", "MF"],
  },
];

function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [addUserTeamId, setAddUserTeamId] = useState<string | null>(null);
  const menuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const hasMenuOpen = Object.values(menuRefs.current).some(
        (menu) => menu && menu.contains(target)
      );

      if (!hasMenuOpen) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCreateTeam = (team: {
    name: string;
    department: string;
    chief: string;
    objective: string;
  }) => {
    const nextTeam: Team = {
      id: `${Date.now()}`,
      name: team.name,
      department: team.department,
      chief: team.chief,
      members: 0,
      active: true,
      objective: team.objective,
      users: [team.chief.slice(0, 2).toUpperCase()],
    };

    setTeams((prev) => [nextTeam, ...prev]);
    setIsCreateModalOpen(false);
  };

  const handleDeleteTeam = (id: string) => {
    setTeams((prev) => prev.filter((team) => team.id !== id));
    if (selectedTeam?.id === id) {
      setSelectedTeam(null);
    }
  };

  const handleUpdateTeam = (updatedTeam: Team) => {
    setTeams((prev) =>
      prev.map((team) => (team.id === updatedTeam.id ? updatedTeam : team))
    );
    setSelectedTeam(null);
  };

  return (
    <div className="teams-page">
      <div className="teams-top">
        <DashboardHeader
          title="Gestion des Équipes"
          subtitle="Organisez vos collaborateurs en groupes de travail fonctionnels."
        />

        <button
          className="add-team-button"
          onClick={() => setIsCreateModalOpen(true)}
        >
          + Nouvelle équipe
        </button>
      </div>

      <div className="teams-grid">
        {teams.map((team) => (
          <article key={team.id} className="team-card">
            <div className="team-card-top">
              <div className="team-icon">
                <FaUsers />
              </div>

              <div
                className="action-menu"
                ref={(element) => {
                  menuRefs.current[team.id] = element;
                }}
                onMouseLeave={() => setOpenMenuId(null)}
              >
                <button
                  type="button"
                  className="team-menu-button"
                  aria-label="Actions"
                  onClick={() => setOpenMenuId(openMenuId === team.id ? null : team.id)}
                >
                  ⋯
                </button>

                {openMenuId === team.id && (
                  <div className="action-dropdown team-dropdown">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedTeam(team);
                        setOpenMenuId(null);
                      }}
                    >
                      Modifier
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAddUserTeamId(team.id);
                        setOpenMenuId(null);
                      }}
                    >
                      Ajouter utilisateur
                    </button>
                    <button
                      type="button"
                      className="delete-action"
                      onClick={() => {
                        handleDeleteTeam(team.id);
                        setOpenMenuId(null);
                      }}
                    >
                      Supprimer
                    </button>
                  </div>
                )}
              </div>
            </div>

            <h3>{team.name}</h3>
            <p className="team-department">{team.department}</p>

            <div className="team-info-row">
              <span className="team-label">Chef d'équipe:</span>
              <span className="team-value">{team.chief}</span>
            </div>

            <div className="team-info-row">
              <span className="team-label">Membres:</span>
              <span className="team-value">{team.members} collaborateurs</span>
            </div>

            <div className="team-footer">
              <div className="avatar-stack">
                {team.users.map((user, index) => (
                  <span key={`${team.id}-${index}`} className="mini-avatar">
                    {user}
                  </span>
                ))}
              </div>

              <span className={`status-pill ${team.active ? "active" : "inactive"}`}>
                {team.active ? "Actif" : "Inactif"}
              </span>
            </div>

            <div className="department-card-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() => setSelectedTeam(team)}
              >
                Modifier
              </button>
              <button
                type="button"
                className="danger-button"
                onClick={() => handleDeleteTeam(team.id)}
              >
                Supprimer
              </button>
            </div>
          </article>
        ))}
      </div>

      <CreateTeamModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateTeam}
      />

      {selectedTeam && (
        <EditTeamModal
          team={selectedTeam}
          onClose={() => setSelectedTeam(null)}
          onSave={handleUpdateTeam}
        />
      )}

      {addUserTeamId && (
        <AddUserToTeamModal
          teamName={teams.find((team) => team.id === addUserTeamId)?.name ?? "Équipe"}
          onClose={() => setAddUserTeamId(null)}
          onAdd={(userName) => {
            setTeams((prev) =>
              prev.map((team) => {
                if (team.id !== addUserTeamId) return team;
                const existing = team.users.includes(userName);
                return {
                  ...team,
                  users: existing ? team.users : [...team.users, userName],
                  members: existing ? team.members : team.members + 1,
                };
              })
            );
            setAddUserTeamId(null);
          }}
        />
      )}
    </div>
  );
}

function AddUserToTeamModal({
  teamName,
  onClose,
  onAdd,
}: {
  teamName: string;
  onClose: () => void;
  onAdd: (userName: string) => void;
}) {
  const [selectedUser, setSelectedUser] = useState("Fatima Bensaid");
  const availableUsers = [
    "Fatima Bensaid",
    "Youssef El Idrissi",
    "Nadia Alami",
    "Omar Tazi",
    "Sara Belkacem",
    "Hassan Moutaki",
    "Leila Berrada",
    "Amine Kabbaj",
  ];

  return (
    <div className="team-modal-backdrop" onClick={onClose}>
      <div className="team-modal" onClick={(event) => event.stopPropagation()}>
        <div className="team-modal-header">
          <h2>Ajouter un utilisateur</h2>
          <button type="button" className="team-modal-close" onClick={onClose} aria-label="Fermer">
            ×
          </button>
        </div>

        <div className="team-modal-body">
          <label className="team-field">
            <span>Équipe</span>
            <input type="text" value={teamName} readOnly />
          </label>

          <label className="team-field">
            <span>Collaborateur</span>
            <select
              value={selectedUser}
              onChange={(event) => setSelectedUser(event.target.value)}
            >
              {availableUsers.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="team-modal-actions">
          <button type="button" className="team-secondary-button" onClick={onClose}>
            Annuler
          </button>
          <button
            type="button"
            className="team-primary-button"
            onClick={() => {
              onAdd(selectedUser);
              onClose();
            }}
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}

function EditTeamModal({
  team,
  onClose,
  onSave,
}: {
  team: Team;
  onClose: () => void;
  onSave: (team: Team) => void;
}) {
  const [form, setForm] = useState({
    name: team.name,
    department: team.department,
    chief: team.chief,
    objective: team.objective ?? "",
    active: team.active,
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave({
      ...team,
      name: form.name.trim() || team.name,
      department: form.department || team.department,
      chief: form.chief.trim() || team.chief,
      objective: form.objective.trim(),
      active: form.active,
    });
  };

  return (
    <div className="team-modal-backdrop" onClick={onClose}>
      <div className="team-modal" onClick={(event) => event.stopPropagation()}>
        <div className="team-modal-header">
          <h2>Modifier l'équipe</h2>
          <button type="button" className="team-modal-close" onClick={onClose} aria-label="Fermer">
            ×
          </button>
        </div>

        <form className="team-modal-body" onSubmit={handleSubmit}>
          <label className="team-field">
            <span>Nom</span>
            <input
              type="text"
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            />
          </label>

          <label className="team-field">
            <span>Département</span>
            <select
              value={form.department}
              onChange={(event) => setForm((prev) => ({ ...prev, department: event.target.value }))}
            >
              <option value="IT & Cybersécurité">IT & Cybersécurité</option>
              <option value="Ressources Humaines">Ressources Humaines</option>
              <option value="Finance & Stratégie">Finance & Stratégie</option>
              <option value="Production & Opérations">Production & Opérations</option>
            </select>
          </label>

          <label className="team-field">
            <span>Chef d'équipe</span>
            <input
              type="text"
              value={form.chief}
              onChange={(event) => setForm((prev) => ({ ...prev, chief: event.target.value }))}
            />
          </label>

          <label className="team-field">
            <span>Objectif</span>
            <textarea
              rows={4}
              value={form.objective}
              onChange={(event) => setForm((prev) => ({ ...prev, objective: event.target.value }))}
            />
          </label>

          <label className="team-field">
            <span>Statut</span>
            <select
              value={form.active ? "active" : "inactive"}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, active: event.target.value === "active" }))
              }
            >
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
            </select>
          </label>

          <div className="team-modal-actions">
            <button type="button" className="team-secondary-button" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="team-primary-button">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TeamsPage;
