import { useEffect, useState } from "react";
import { MdBusiness } from "react-icons/md";
import DashboardHeader from "../dashboard/components/DashboardHeader";
import CreateDepartmentModal from "./components/CreateDepartmentModal";
import {
  createDepartment,
  getDepartments,
  type Department,
} from "../../api/departmentApi";
import "./DepartmentsPage.css";

interface DepartmentFormState {
  name: string;
  code: string;
  description: string;
  status: "ACTIVE" | "ARCHIVED";
}

function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const data = await getDepartments();
      setDepartments(data);
      setError("");
    } catch (err) {
      console.error("Erreur chargement départements:", err);
      setError("Impossible de charger les départements.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleCreateDepartment = async (department: {
    name: string;
    director: string;
    description: string;
  }) => {
    try {
      const payload = {
        name: department.name,
        description: department.description,
        code: department.name.slice(0, 4).toUpperCase(),
        managerId: undefined,
        status: "ACTIVE" as const,
      };

      const createdDepartment = await createDepartment(payload);
      setDepartments((prev) => [createdDepartment, ...prev]);
      setIsCreateModalOpen(false);
      setError("");
    } catch (err) {
      console.error("Erreur création département:", err);
      setError("Impossible de créer le département.");
    }
  };

  const handleDeleteDepartment = (id: string) => {
    setDepartments((prev) => prev.filter((department) => department.id !== id));
    if (selectedDepartment?.id === id) {
      setSelectedDepartment(null);
    }
  };

  const handleUpdateDepartment = (updatedDepartment: Department) => {
    setDepartments((prev) =>
      prev.map((department) =>
        department.id === updatedDepartment.id ? updatedDepartment : department
      )
    );
    setSelectedDepartment(null);
  };

  if (loading) {
    return <p>Chargement des départements...</p>;
  }

  return (
    <div className="departments-page">
      <div className="departments-top">
        <DashboardHeader
          title="Organisation & Départements"
          subtitle="Gérez la structure organisationnelle, les départements et les équipes."
        />

        <button
          className="add-department-button"
          onClick={() => setIsCreateModalOpen(true)}
        >
          + Nouveau département
        </button>
      </div>

      {error && <div className="edit-form-error">{error}</div>}

      <div className="departments-grid">
        {departments.map((department) => (
          <article key={department.id} className="department-card">
            <div className="department-card-top">
              <div className="department-icon">
                <MdBusiness />
              </div>

              <div
                className="action-menu"
                onMouseLeave={() => setOpenMenuId(null)}
                onClick={() => setOpenMenuId(openMenuId === department.id ? null : department.id)}
              >
                <button type="button" className="department-menu-button" aria-label="Actions">
                  ⋯
                </button>

                {openMenuId === department.id && (
                  <div className="action-dropdown department-dropdown">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedDepartment(department);
                        setOpenMenuId(null);
                      }}
                    >
                      Modifier
                    </button>
                    <button
                      type="button"
                      className="delete-action"
                      onClick={() => {
                        handleDeleteDepartment(department.id);
                        setOpenMenuId(null);
                      }}
                    >
                      Supprimer
                    </button>
                  </div>
                )}
              </div>
            </div>

            <h3>{department.name}</h3>
            <p className="department-director">
              {department.description || "Aucune description disponible"}
            </p>

            <div className="department-footer">
              <div className="department-meta">
                <span>Code</span>
                <strong>{department.code || "-"}</strong>
              </div>

              <div className="department-meta">
                <span>Statut</span>
                <strong>{department.status === "ACTIVE" ? "Actif" : "Archivé"}</strong>
              </div>
            </div>

          </article>
        ))}
      </div>

      <CreateDepartmentModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateDepartment}
      />

      {selectedDepartment && (
        <EditDepartmentModal
          department={selectedDepartment}
          onClose={() => setSelectedDepartment(null)}
          onSave={handleUpdateDepartment}
        />
      )}
    </div>
  );
}

function EditDepartmentModal({
  department,
  onClose,
  onSave,
}: {
  department: Department;
  onClose: () => void;
  onSave: (department: Department) => void;
}) {
  const [form, setForm] = useState<DepartmentFormState>({
    name: department.name,
    code: department.code ?? "",
    description: department.description ?? "",
    status: department.status ?? "ACTIVE",
  });

  useEffect(() => {
    setForm({
      name: department.name,
      code: department.code ?? "",
      description: department.description ?? "",
      status: department.status ?? "ACTIVE",
    });
  }, [department]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave({
      ...department,
      name: form.name.trim() || department.name,
      code: form.code.trim() || department.code || "",
      description: form.description.trim(),
      status: form.status,
    });
  };

  return (
    <div className="department-modal-backdrop" onClick={onClose}>
      <div className="department-modal" onClick={(event) => event.stopPropagation()}>
        <div className="department-modal-header">
          <h2>Modifier le département</h2>
          <button type="button" className="department-modal-close" onClick={onClose} aria-label="Fermer">
            ×
          </button>
        </div>

        <form className="department-modal-body" onSubmit={handleSubmit}>
          <label className="department-field">
            <span>Nom</span>
            <input
              type="text"
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            />
          </label>

          <label className="department-field">
            <span>Code</span>
            <input
              type="text"
              value={form.code}
              onChange={(event) => setForm((prev) => ({ ...prev, code: event.target.value }))}
            />
          </label>

          <label className="department-field">
            <span>Description</span>
            <textarea
              rows={4}
              value={form.description}
              onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
            />
          </label>

          <label className="department-field">
            <span>Statut</span>
            <select
              value={form.status}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  status: event.target.value as "ACTIVE" | "ARCHIVED",
                }))
              }
            >
              <option value="ACTIVE">Actif</option>
              <option value="ARCHIVED">Archivé</option>
            </select>
          </label>

          <div className="department-modal-actions">
            <button type="button" className="secondary-button" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="primary-button">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DepartmentsPage;
