
import { useEffect, useState } from "react";
import { FiMail, FiX, FiUser, FiBriefcase, FiShield } from "react-icons/fi";

import "../styles/EditUserModal.css";

import {
  getDepartements,
  updateUser,
} from "../../../api/userApi";

import type {
  Departement,
  UpdateUserRequest,
} from "../../../api/userApi";

import { getRoles } from "../../../api/roleApi";
import type { Role } from "../../../types/role.types";
import type { User } from "../../../types/User.type";

interface EditUserModalProps {
  open: boolean;
  user: User;
  onClose: () => void;
  onUserUpdated: (user: User) => void;
}

function EditUserModal({
  open,
  user,
  onClose,
  onUserUpdated,
}: EditUserModalProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [departement, setDepartement] = useState("");
  const [roleId, setRoleId] = useState("");

  const [departements, setDepartements] = useState<Departement[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  const [error, setError] = useState("");

  // =========================
  // INITIALISATION
  // =========================

  useEffect(() => {
    if (!open || !user) return;

    setFirstName(user.firstName ?? "");
    setLastName(user.lastName ?? "");
    setEmail(user.email ?? "");

    setDepartement(user.departement?.id ?? "");

    const normalizedRoles = Array.isArray(user.roles)
      ? user.roles
      : user.roles && typeof user.roles === "object" && "id" in user.roles
        ? [user.roles as typeof user.roles]
        : [];

    setRoleId(normalizedRoles[0]?.id ?? "");

    setError("");
  }, [open, user]);

  // =========================
  // CHARGEMENT DATA
  // =========================

  useEffect(() => {
    if (!open) return;

    const loadData = async () => {
      try {
        setLoadingData(true);

        const [departementsData, rolesData] = await Promise.all([
          getDepartements(),
          getRoles(),
        ]);

        setDepartements(departementsData);
        setRoles(rolesData);
      } catch (error) {
        console.error("Erreur chargement :", error);
        setError(
          "Impossible de charger les départements et les rôles."
        );
      } finally {
        setLoadingData(false);
      }
    };

    loadData();
  }, [open]);

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (!firstName.trim()) {
      setError("Le prénom est obligatoire.");
      return;
    }

    if (!lastName.trim()) {
      setError("Le nom est obligatoire.");
      return;
    }

    if (!email.trim()) {
      setError("L'email est obligatoire.");
      return;
    }

    try {
      setLoading(true);

      const data: UpdateUserRequest = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        departement: departement || undefined,
        roleId: roleId || undefined,
      };

      const updatedUser = await updateUser(user.id, data);

      onUserUpdated(updatedUser);
    } catch (error) {
      console.error("Erreur modification utilisateur :", error);

      setError(
        "Une erreur est survenue lors de la modification."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="edit-modal-overlay">
      <div className="edit-user-modal">

        {/* HEADER */}
        <div className="edit-modal-header">
          <div className="edit-header-content">
            <div className="edit-header-icon">
              <FiUser />
            </div>

            <div>
              <h2>Modifier l'utilisateur</h2>
              <p>
                Mettez à jour les informations du collaborateur.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="edit-close-button"
            onClick={onClose}
            disabled={loading}
          >
            <FiX />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="edit-user-form">

          {/* INFORMATIONS PERSONNELLES */}
          <div className="form-section">
            <div className="section-title">
              <FiUser />
              <span>Informations personnelles</span>
            </div>

            <div className="form-row">

              {/* PRENOM */}
              <div className="edit-form-group">
                <label htmlFor="firstName">
                  Prénom <span>*</span>
                </label>

                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Ex. Fatima"
                  disabled={loading}
                />
              </div>

              {/* NOM */}
              <div className="edit-form-group">
                <label htmlFor="lastName">
                  Nom <span>*</span>
                </label>

                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Ex. Bousmiti"
                  disabled={loading}
                />
              </div>

            </div>

            {/* EMAIL */}
            <div className="edit-form-group">
              <label htmlFor="email">
                Adresse email <span>*</span>
              </label>

              <div className="edit-input-icon">
                <FiMail />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@ocp.com"
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          {/* ORGANISATION */}
          <div className="form-section">
            <div className="section-title">
              <FiBriefcase />
              <span>Organisation</span>
            </div>

            <div className="form-row">

              {/* DEPARTEMENT */}
              <div className="edit-form-group">
                <label htmlFor="departement">
                  Département
                </label>

                <select
                  id="departement"
                  value={departement}
                  onChange={(e) =>
                    setDepartement(e.target.value)
                  }
                  disabled={loadingData || loading}
                >
                  <option value="">
                    Sélectionner
                  </option>

                  {departements.map((department) => (
                    <option
                      key={department.id}
                      value={department.id}
                    >
                      {department.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* ROLE */}
              <div className="edit-form-group">
                <label htmlFor="role">
                  Rôle
                </label>

                <div className="edit-select-wrapper">
                  <FiShield />

                  <select
                    id="role"
                    value={roleId}
                    onChange={(e) =>
                      setRoleId(e.target.value)
                    }
                    disabled={loadingData || loading}
                  >
                    <option value="">
                      Sélectionner
                    </option>

                    {roles.map((role) => (
                      <option
                        key={role.id}
                        value={role.id}
                      >
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

            </div>
          </div>

          {/* LOADING DATA */}
          {loadingData && (
            <div className="edit-info-message">
              Chargement des départements et des rôles...
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="edit-form-error">
              {error}
            </div>
          )}

          {/* FOOTER */}
          <div className="edit-modal-footer">
            <button
              type="button"
              className="edit-cancel-button"
              onClick={onClose}
              disabled={loading}
            >
              Annuler
            </button>

            <button
              type="submit"
              className="edit-save-button"
              disabled={loading || loadingData}
            >
              {loading ? (
                <>
                  <span className="edit-spinner"></span>
                  Enregistrement...
                </>
              ) : (
                "Enregistrer les modifications"
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default EditUserModal;

