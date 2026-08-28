import { useState, type FormEvent } from "react";
import "../styles/Communication.css";

interface CreateChannelModalProps {
  onClose: () => void;
  onCreate: (name: string, isPrivate: boolean) => void;
}

export default function CreateChannelModal({ onClose, onCreate }: CreateChannelModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    onCreate(name.trim(), isPrivate);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Créer un canal</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="channel-name">Nom du canal</label>
          <div className="input-with-prefix">
            <span className="input-prefix">#</span>
            <input
              id="channel-name"
              type="text"
              placeholder="nom-du-canal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>

          <label htmlFor="channel-description">Description (Optionnel)</label>
          <textarea
            id="channel-description"
            placeholder="De quoi parle-t-on ici ?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="modal-toggle-row">
            <div>
              <strong>Rendre privé</strong>
              <p>Seuls les membres invités peuvent rejoindre et voir ce canal.</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
              />
              <span className="slider" />
            </label>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="btn-primary">
              Créer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}