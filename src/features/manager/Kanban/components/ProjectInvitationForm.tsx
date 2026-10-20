import { useEffect, useState } from "react";
import { Modal, Feedback } from "../../../admin/AdminUI";
import { projectInvitationApi } from "../../../../api/projectInvitationApi";
import type { ProjectInvitation } from "../../../../api/projectInvitationApi";
import type { Person } from "../../../../api/collaborationApi";
import { errorMessage } from "../../../../api/adminApi";
const labels = {
  PENDING: "En attente",
  ACCEPTED: "Acceptée",
  DECLINED: "Refusée",
  CANCELLED: "Annulée",
};
export default function ProjectInvitationForm({
  projectId,
  people,
  userId,
  onClose,
}: {
  projectId: string;
  people: Person[];
  userId: string;
  onClose: () => void;
}) {
  const [items, setItems] = useState<ProjectInvitation[]>([]),
    [id, setId] = useState(""),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  useEffect(() => {
    projectInvitationApi
      .list(projectId)
      .then(setItems)
      .catch((e) => setError(errorMessage(e)));
  }, [projectId]);
  return (
    <Modal title="Inviter au projet" onClose={onClose} busy={busy}>
      <Feedback error={error} />
      <form
        className="collab-form"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          try {
            await projectInvitationApi.invite(projectId, id);
            setItems(await projectInvitationApi.list(projectId));
            setId("");
          } catch (err) {
            setError(errorMessage(err));
          } finally {
            setBusy(false);
          }
        }}
      >
        <p>
          Une invitation donne accès au projet et à ses tâches après
          acceptation. La modification des tâches reste réservée aux
          responsables ; le changement de statut reste réservé aux responsables
          et à la personne affectée.
        </p>
        <label>
          Collaborateur
          <select required value={id} onChange={(e) => setId(e.target.value)}>
            <option value="">Sélectionner</option>
            {people
              .filter(
                (p) =>
                  p.id !== userId &&
                  !items.some(
                    (i) =>
                      i.userId === p.id &&
                      (i.status === "PENDING" || i.status === "ACCEPTED"),
                  ),
              )
              .map((p) => (
                <option key={p.id} value={p.id}>
                  {[p.firstName, p.lastName].filter(Boolean).join(" ") ||
                    p.email}
                </option>
              ))}
          </select>
        </label>
        <button disabled={busy || !id} className="collab-primary">
          Envoyer l’invitation
        </button>
      </form>
      <ul className="project-invitation-history">
        {items.map((i) => (
          <li key={i.id}>
            <div>
              <strong>
                {people.find((p) => p.id === i.userId)?.email ||
                  "Collaborateur"}
              </strong>
              <small>{labels[i.status]}</small>
            </div>
            {i.status === "PENDING" && (
              <button
                disabled={busy}
                onClick={async () => {
                  setBusy(true);
                  try {
                    await projectInvitationApi.cancel(projectId, i.id);
                    setItems(await projectInvitationApi.list(projectId));
                  } catch (e) {
                    setError(errorMessage(e));
                  } finally {
                    setBusy(false);
                  }
                }}
              >
                Annuler
              </button>
            )}
          </li>
        ))}
      </ul>
    </Modal>
  );
}
