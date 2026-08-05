import { FiMail, FiX } from "react-icons/fi";

import "../styles/CreateUserModal.css";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CreateUserModal({
  open,
  onClose,
}: Props) {

  if (!open) return null;

  return (

    <div className="modal-overlay">

      <div className="create-user-modal">

        <div className="modal-header">

          <h2>Nouvel utilisateur</h2>

          <button
            className="close-button"
            onClick={onClose}
          >
            <FiX />
          </button>

        </div>

        <div className="modal-body">

          <div className="two-columns">

            <div className="field">

              <label>Prénom</label>

              <input
                placeholder="Ex: Ahmed"
              />

            </div>

            <div className="field">

              <label>Nom</label>

              <input
                placeholder="Ex: Darif"
              />

            </div>

          </div>

          <div className="field">

            <label>Adresse Email (OCP)</label>

            <div className="email-input">

              <FiMail />

              <input
                placeholder="a.darif@ocpgroup.ma"
              />

            </div>

          </div>

          <div className="two-columns">

            <div className="field">

              <label>Département</label>

              <select>
                <option>Sélectionner</option>
              </select>

            </div>

            <div className="field">

              <label>Rôle Système</label>

              <select>
                <option>Sélectionner</option>
              </select>

            </div>

          </div>

          <div className="mfa-box">

            <input
              type="checkbox"
              defaultChecked
            />

            <div>

              <strong>Exiger le MFA à la connexion</strong>

              <p>
                L'utilisateur devra configurer une application
                d'authentification.
              </p>

            </div>

          </div>

        </div>

        <div className="modal-footer">

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Annuler
          </button>

          <button className="create-btn">
            Créer l'utilisateur
          </button>

        </div>

      </div>

    </div>

  );
}