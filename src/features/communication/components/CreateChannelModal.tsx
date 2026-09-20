import { useState, type FormEvent } from "react";
import type { User } from "../../../types/User.type";
import type { CreateConversationOptions } from "../types/communication.types";
import "../styles/Communication.css";

interface CreateChannelModalProps {
  onClose: () => void;
  users: User[];
  currentUserId: string;
  onCreate: (options: CreateConversationOptions) => void;
}

export default function CreateChannelModal({ onClose, users, currentUserId, onCreate }: CreateChannelModalProps) {
  const [mode, setMode] = useState<"PRIVATE" | "CHANNEL">("PRIVATE");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);
  const [includeEveryone, setIncludeEveryone] = useState(false);

  const availableUsers = users.filter((user) => String(user.id) !== currentUserId);
  const allMemberIds = availableUsers.map((user) => String(user.id));

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (mode === "PRIVATE" && selectedMemberIds.length !== 1) return;
    if (mode === "CHANNEL" && !name.trim()) return;

    const recipient = availableUsers.find((user) => String(user.id) === selectedMemberIds[0]);
    onCreate({
      type: mode,
      name: mode === "PRIVATE" ? recipient?.fullName || recipient?.email || "Message direct" : name.trim(),
      memberIds: mode === "CHANNEL" && includeEveryone ? allMemberIds : selectedMemberIds,
    });
  }

  function toggleMember(userId: string) {
    setSelectedMemberIds((current) => current.includes(userId)
      ? current.filter((id) => id !== userId)
      : [...current, userId]);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{mode === "PRIVATE" ? "Nouveau message direct" : "Créer un canal"}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="conversation-mode-tabs" role="tablist" aria-label="Type de conversation">
          <button type="button" className={mode === "PRIVATE" ? "active" : ""} onClick={() => setMode("PRIVATE")}>
            Message direct
          </button>
          <button type="button" className={mode === "CHANNEL" ? "active" : ""} onClick={() => setMode("CHANNEL")}>
            Canal / groupe
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === "CHANNEL" && <>
            <label htmlFor="channel-name">Nom du canal</label>
            <div className="input-with-prefix">
              <span className="input-prefix">#</span>
              <input id="channel-name" type="text" placeholder="nom-du-canal" value={name} onChange={(e) => setName(e.target.value)} autoFocus />
            </div>
          </>}

          {mode === "CHANNEL" && <>
            <label htmlFor="channel-description">Description (Optionnel)</label>
            <textarea id="channel-description" placeholder="De quoi parle-t-on ici ?" value={description} onChange={(e) => setDescription(e.target.value)} />
          </>}

          <label>{mode === "PRIVATE" ? "Choisir une personne" : "Ajouter des membres"}</label>
          {mode === "CHANNEL" && <label className="member-choice member-choice-all">
            <input type="checkbox" checked={includeEveryone} onChange={(e) => {
              setIncludeEveryone(e.target.checked);
              setSelectedMemberIds(e.target.checked ? allMemberIds : []);
            }} />
            <span><strong>Tout le monde</strong><small>Ajouter tous les utilisateurs au canal</small></span>
          </label>}
          <div className="member-list">
            {availableUsers.map((user) => {
              const userId = String(user.id);
              return <label className="member-choice" key={userId}>
                <input type={mode === "PRIVATE" ? "radio" : "checkbox"} name={mode === "PRIVATE" ? "direct-recipient" : undefined} checked={selectedMemberIds.includes(userId)} onChange={() => mode === "PRIVATE" ? setSelectedMemberIds([userId]) : toggleMember(userId)} />
                <span className="member-avatar">{(user.fullName || user.email).slice(0, 2).toUpperCase()}</span>
                <span><strong>{user.fullName || "Utilisateur"}</strong><small>{user.email}</small></span>
              </label>;
            })}
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="btn-primary" disabled={mode === "PRIVATE" ? selectedMemberIds.length !== 1 : !name.trim()}>
              {mode === "PRIVATE" ? "Démarrer" : "Créer le canal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}