import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

interface DepartmentFormValues {
  name: string;
  director: string;
  description: string;
}

interface CreateDepartmentModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (department: DepartmentFormValues) => void;
}

const initialForm: DepartmentFormValues = {
  name: "",
  director: "",
  description: "",
};

export default function CreateDepartmentModal({
  open,
  onClose,
  onCreate,
}: CreateDepartmentModalProps) {
  const [form, setForm] = useState<DepartmentFormValues>(initialForm);

  useEffect(() => {
    if (open) {
      setForm(initialForm);
    }
  }, [open]);

  if (!open) {
    return null;
  }

  const handleChange = (
    field: keyof DepartmentFormValues,
    value: string
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const name = form.name.trim();
    const director = form.director.trim();

    if (!name || !director) {
      return;
    }

    onCreate({
      name,
      director,
      description: form.description.trim(),
    });
    setForm(initialForm);
  };

  return (
    <div className="department-modal-backdrop" onClick={onClose}>
      <div
        className="department-modal"
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="department-modal-header">
          <h2>Nouveau département</h2>
          <button
            type="button"
            className="department-modal-close"
            onClick={onClose}
            aria-label="Fermer"
          >
            <FiX />
          </button>
        </div>

        <div className="department-modal-body">
          <label className="department-field">
            <span>Nom du département</span>
            <input
              type="text"
              value={form.name}
              onChange={(event) =>
                handleChange("name", event.target.value)
              }
              placeholder="Ex: R&D Innovation"
            />
          </label>

          <label className="department-field">
            <span>Directeur / Responsable</span>
            <input
              type="text"
              value={form.director}
              onChange={(event) =>
                handleChange("director", event.target.value)
              }
              placeholder="Nom du responsable"
            />
          </label>

          <label className="department-field">
            <span>Description (Optionnel)</span>
            <textarea
              value={form.description}
              onChange={(event) =>
                handleChange("description", event.target.value)
              }
              placeholder="Mission principale du département..."
              rows={4}
            />
          </label>
        </div>

        <div className="department-modal-actions">
          <button type="button" className="secondary-button" onClick={onClose}>
            Annuler
          </button>
          <button
            type="button"
            className="primary-button"
            onClick={handleSubmit}
          >
            Créer le département
          </button>
        </div>
      </div>
    </div>
  );
}
