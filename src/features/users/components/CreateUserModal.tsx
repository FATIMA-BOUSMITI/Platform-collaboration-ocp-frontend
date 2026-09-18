import { useEffect, useState } from "react";
import { FiMail, FiX } from "react-icons/fi";

import "../styles/CreateUserModal.css";

import {
  getDepartements,
  createUser,
} from "../../../api/userApi";

import type {
  Departement,
} from "../../../api/userApi";

import { getRoles } from "../../../api/roleApi";
import type { Roles } from "../../../types/role.types";

import type { User } from "../../../types/User.type";


interface Props {
  open: boolean;
  onClose: () => void;
  onUserCreated: (user: User) => void;
}


export default function CreateUserModal({
  open,
  onClose,
  onUserCreated,
}: Props) {

  // ============================
  // FORMULAIRE
  // ============================

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [departementId, setDepartementId] = useState("");
  const [roleId, setRoleId] = useState("");

  // ============================
  // DONNÉES
  // ============================

  const [departements, setDepartements] =
    useState<Departement[]>([]);

  const [roles, setRoles] =
    useState<Roles[]>([]);

  // ============================
  // ETATS
  // ============================

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  // ============================
  // CHARGER DEPARTEMENTS + ROLES
  // ============================

  useEffect(() => {

    if (!open) return;

    const loadData = async () => {

      try {

        setError("");

        const [
          departementsData,
          rolesData
        ] = await Promise.all([
          getDepartements(),
          getRoles(),
        ]);

        setDepartements(departementsData);
        setRoles(rolesData);

        console.log(
          "DÉPARTEMENTS :",
          departementsData
        );

        console.log(
          "ROLES :",
          rolesData
        );

      } catch (error) {

        console.error(
          "Erreur lors du chargement des départements/rôles :",
          error
        );

        setError(
          "Impossible de charger les départements et les rôles."
        );
      }
    };

    loadData();

  }, [open]);


  // ============================
  // CREER UTILISATEUR
  // ============================

  const handleCreateUser = async () => {

    setError("");


    // ----------------------------
    // VALIDATIONS
    // ----------------------------

    if (!firstName.trim()) {
      setError("Le prénom est obligatoire.");
      return;
    }

    if (!lastName.trim()) {
      setError("Le nom est obligatoire.");
      return;
    }

    if (!email.trim()) {
      setError("L'adresse email est obligatoire.");
      return;
    }

    if (!departementId) {
      setError("Veuillez sélectionner un département.");
      return;
    }

    if (!roleId) {
      setError("Veuillez sélectionner un rôle.");
      return;
    }


    try {

      setLoading(true);


      // ----------------------------
      // DONNÉES À ENVOYER
      // ----------------------------

      const request = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        departement: departementId,
        roleId: roleId,
      };


      console.log(
        "=============================="
      );

      console.log(
        "CRÉATION UTILISATEUR"
      );

      console.log(
        "Données envoyées :",
        request
      );


      // ----------------------------
      // APPEL BACKEND
      // ----------------------------

      const newUser = await createUser(request);


      console.log(
        "Utilisateur créé :",
        newUser
      );


      // ----------------------------
      // INFORMER USERS PAGE
      // ----------------------------

      onUserCreated(newUser);


      // ----------------------------
      // RESET FORMULAIRE
      // ----------------------------

      setFirstName("");
      setLastName("");
      setEmail("");
      setDepartementId("");
      setRoleId("");


      // ----------------------------
      // FERMER MODAL
      // ----------------------------

      onClose();


    } catch (error: any) {

      console.error(
        "Erreur lors de la création de l'utilisateur :",
        error
      );


      // Message backend
      if (error?.response?.data?.message) {

        setError(
          error.response.data.message
        );

      } else if (error?.response?.data) {

        setError(
          String(error.response.data)
        );

      } else {

        setError(
          "Erreur lors de la création de l'utilisateur."
        );
      }

    } finally {

      setLoading(false);
    }
  };


  // ============================
  // SI MODAL FERMÉ
  // ============================

  if (!open) {
    return null;
  }


  // ============================
  // INTERFACE
  // ============================

  return (

    <div className="modal-overlay">

      <div className="create-user-modal">


        {/* ==========================
            HEADER
        ========================== */}

        <div className="modal-header">

          <h2>
            Nouvel utilisateur
          </h2>

          <button
            className="close-button"
            onClick={onClose}
            disabled={loading}
          >
            <FiX />
          </button>

        </div>


        {/* ==========================
            BODY
        ========================== */}

        <div className="modal-body">


          {/* PRENOM + NOM */}

          <div className="two-columns">


            {/* PRENOM */}

            <div className="field">

              <label>
                Prénom
              </label>

              <input
                type="text"
                placeholder="Ex: Ahmed"
                value={firstName}
                onChange={(e) =>
                  setFirstName(e.target.value)
                }
              />

            </div>


            {/* NOM */}

            <div className="field">

              <label>
                Nom
              </label>

              <input
                type="text"
                placeholder="Ex: Darif"
                value={lastName}
                onChange={(e) =>
                  setLastName(e.target.value)
                }
              />

            </div>

          </div>


          {/* EMAIL */}

          <div className="field">

            <label>
              Adresse Email (OCP)
            </label>

            <div className="email-input">

              <FiMail />

              <input
                type="email"
                placeholder="a.darif@ocpgroup.ma"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

            </div>

          </div>


          {/* DEPARTEMENT + ROLE */}

          <div className="two-columns">


            {/* DEPARTEMENT */}

            <div className="field">

              <label>
                Département
              </label>

              <select
                value={departementId}
                onChange={(e) =>
                  setDepartementId(e.target.value)
                }
              >

                <option value="">
                  Sélectionner
                </option>


                {departements.map(
                  (departement) => (

                    <option
                      key={departement.id}
                      value={departement.id}
                    >
                      {departement.name}
                    </option>

                  )
                )}

              </select>

            </div>


            {/* ROLE */}

            <div className="field">

              <label>
                Rôle Système
              </label>

              <select
                value={roleId}
                onChange={(e) =>
                  setRoleId(e.target.value)
                }
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


          {/* MFA */}

          <div className="mfa-box">

            <input
              type="checkbox"
              defaultChecked
            />

            <div>

              <strong>
                Exiger le MFA à la connexion
              </strong>

              <p>
                L'utilisateur devra configurer
                une application d'authentification.
              </p>

            </div>

          </div>


          {/* ERREUR */}

          {error && (

            <p
              className="error-message"
              style={{
                color: "red",
                marginTop: "10px"
              }}
            >
              {error}
            </p>

          )}

        </div>


        {/* ==========================
            FOOTER
        ========================== */}

        <div className="modal-footer">


          {/* ANNULER */}

          <button
            className="cancel-btn"
            onClick={onClose}
            disabled={loading}
          >
            Annuler
          </button>


          {/* CREER */}

          <button
            className="create-btn"
            onClick={handleCreateUser}
            disabled={loading}
          >

            {loading
              ? "Création..."
              : "Créer l'utilisateur"}

          </button>

        </div>

      </div>

    </div>
  );
}