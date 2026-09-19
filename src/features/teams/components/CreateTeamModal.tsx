import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

interface TeamFormValues {
  name: string;
  department: string;
  chief: string;
  objective: string;
}

interface CreateTeamModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (team: TeamFormValues) => void;
}

const initialForm: TeamFormValues = {
  name: "",
  department: "",
  chief: "",
  objective: "",
};

export default function CreateTeamModal({
  open,
  onClose,
  onCreate,
}: CreateTeamModalProps) {
  const [form, setForm] = useState<TeamFormValues>(initialForm);

  useEffect(() => {
    if (open) {
      setForm(initialForm);
    }
  }, [open]);

  if (!open) return null;

  const handleChange = (field: keyof TeamFormValues, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!form.name.trim() || !form.department.trim() || !form.chief.trim()) {
      return;
    }

    onCreate({
      name: form.name.trim(),
      department: form.department.trim(),
      chief: form.chief.trim(),
      objective: form.objective.trim(),
    });
    setForm(initialForm);
  };

  return (
    <div className="team-modal-backdrop" onClick={onClose}>
      <div
        className="team-modal"
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="team-modal-header">
          <h2>Nouvelle équipe</h2>
          <button
            type="button"
            className="team-modal-close"
            onClick={onClose}
            aria-label="Fermer"
          >
            <FiX />
          </button>
        </div>

        <div className="team-modal-body">
          <label className="team-field">
            <span>Nom de l'équipe</span>
            <input
              type="text"
              value={form.name}
              onChange={(event) => handleChange("name", event.target.value)}
              placeholder="Ex: Audit Interne"
            />
          </label>

          <label className="team-field">
            <span>Département de rattachement</span>
            <select
              value={form.department}
              onChange={(event) => handleChange("department", event.target.value)}
            >
              <option value="">Sélectionner un département</option>
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
              onChange={(event) => handleChange("chief", event.target.value)}
              placeholder="Rechercher un collaborateur..."
            />
          </label>

          <label className="team-field">
            <span>Objectif / Mission (Optionnel)</span>
            <textarea
              value={form.objective}
              onChange={(event) => handleChange("objective", event.target.value)}
              placeholder="Décrire le rôle de cette équipe..."
            />
          </label>
        </div>

        <div className="team-modal-actions">
          <button type="button" className="team-secondary-button" onClick={onClose}>
            Annuler
          </button>
          <button type="button" className="team-primary-button" onClick={handleSubmit}>
            Créer l'équipe
          </button>
        </div>
      </div>
    </div>
  );
}
