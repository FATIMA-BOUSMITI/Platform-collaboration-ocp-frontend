import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { FiCheckCircle, FiDownload, FiFile, FiSearch, FiTrash2, FiUpload, FiX } from "react-icons/fi";
import { useAuthStore } from "../../auth/AuthStore";
import {
  deleteDocument,
  getDocuments,
  getDocumentsByOwner,
  searchDocuments,
  uploadDocument,
  validateDocument,
  type DocumentResponse,
  type DocumentStatus,
} from "../../../api/documentApi";
import "../styles/DocumentsPage.css";

type Role = "ADMIN" | "DIRECTOR" | "MANAGER" | "EMPLOYEE";
type FilterStatus = "ALL" | DocumentStatus;

const managementRoles: Role[] = ["ADMIN", "DIRECTOR", "MANAGER"];

function formatSize(sizeBytes: number) {
  if (sizeBytes < 1024) return `${sizeBytes} o`;
  if (sizeBytes < 1024 * 1024) return `${(sizeBytes / 1024).toFixed(1)} Ko`;
  return `${(sizeBytes / (1024 * 1024)).toFixed(1)} Mo`;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium" }).format(new Date(date));
}

function getFileKind(type: string) {
  const normalizedType = type.toUpperCase();
  if (normalizedType.includes("PDF")) return "PDF";
  if (normalizedType.includes("IMAGE")) return "IMG";
  if (normalizedType.includes("WORD")) return "DOC";
  if (normalizedType.includes("EXCEL")) return "XLS";
  return "FILE";
}

export default function DocumentsPage() {
  const currentUser = useAuthStore((state) => state.user);
  const role = (useAuthStore((state) => state.role) ?? "EMPLOYEE") as Role;
  const canManageDocuments = managementRoles.includes(role);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [documents, setDocuments] = useState<DocumentResponse[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<FilterStatus>("ALL");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadName, setUploadName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  const loadDocuments = useCallback(async (search = "") => {
    if (!currentUser) return;
    setIsLoading(true);
    setError("");
    try {
      const result = search.trim()
        ? await searchDocuments(search.trim())
        : role === "EMPLOYEE"
          ? await getDocumentsByOwner(currentUser.userId)
          : await getDocuments();
      setDocuments(result);
    } catch {
      setError("Impossible de charger les documents. Vérifiez que le service est disponible.");
    } finally {
      setIsLoading(false);
    }
  }, [currentUser, role]);

  useEffect(() => {
    const timer = window.setTimeout(() => void loadDocuments(query), 300);
    return () => window.clearTimeout(timer);
  }, [loadDocuments, query]);

  const visibleDocuments = useMemo(
    () => documents.filter((document) => status === "ALL" || document.status === status),
    [documents, status]
  );

  const counts = useMemo(() => ({
    total: documents.length,
    validated: documents.filter((document) => document.status === "VALIDATED").length,
    drafts: documents.filter((document) => document.status === "DRAFT").length,
  }), [documents]);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    setSelectedFile(event.target.files?.[0] ?? null);
    setFeedback("");
    setError("");
  }

  async function handleUpload() {
    if (!selectedFile || !currentUser) return;
    setIsUploading(true);
    setError("");
    try {
      await uploadDocument(selectedFile, currentUser.userId, uploadName.trim() || undefined);
      setFeedback("Document ajouté avec succès.");
      setSelectedFile(null);
      setUploadName("");
      setIsUploadOpen(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
      await loadDocuments(query);
    } catch {
      setError("Le téléversement a échoué. Vérifiez le fichier puis réessayez.");
    } finally {
      setIsUploading(false);
    }
  }

  async function handleValidate(documentId: string) {
    try {
      const updated = await validateDocument(documentId);
      setDocuments((current) => current.map((document) => document.id === documentId ? updated : document));
      setFeedback("Document validé.");
    } catch {
      setError("La validation du document a échoué.");
    }
  }

  async function handleDelete(documentId: string) {
    if (!window.confirm("Supprimer ce document ?")) return;
    try {
      await deleteDocument(documentId);
      setDocuments((current) => current.filter((document) => document.id !== documentId));
      setFeedback("Document supprimé.");
    } catch {
      setError("La suppression du document a échoué.");
    }
  }

  if (!currentUser) return null;

  return (
    <section className="documents-page">
      <header className="documents-heading">
        <div>
         
          <h1>Gestion Documentaire</h1>
          <p>{canManageDocuments ? "Centralisez, validez et partagez les documents de l'organisation." : "Retrouvez vos documents et partagez vos fichiers avec votre équipe."}</p>
        </div>
        <button className="documents-upload-button" onClick={() => setIsUploadOpen(true)}>
          <FiUpload /> Ajouter un document
        </button>
      </header>

      {(feedback || error) && <div className={`documents-alert ${error ? "is-error" : ""}`}>{error || feedback}</div>}

      <div className="documents-summary">
        <div><span>Total</span><strong>{counts.total}</strong><small>documents visibles</small></div>
        <div><span>Validés</span><strong>{counts.validated}</strong><small>prêts à partager</small></div>
        <div><span>Brouillons</span><strong>{counts.drafts}</strong><small>à vérifier</small></div>
      </div>

      <div className="documents-toolbar">
        <label className="documents-search">
          <FiSearch />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher un document" />
        </label>
        <div className="documents-filters" aria-label="Filtrer les documents">
          {(["ALL", "VALIDATED", "DRAFT", "ARCHIVED"] as FilterStatus[]).map((filter) => (
            <button key={filter} className={status === filter ? "is-active" : ""} onClick={() => setStatus(filter)}>
              {filter === "ALL" ? "Tous" : filter === "VALIDATED" ? "Validés" : filter === "DRAFT" ? "Brouillons" : "Archivés"}
            </button>
          ))}
        </div>
      </div>

      <div className="documents-list-header"><span>{visibleDocuments.length} résultat{visibleDocuments.length > 1 ? "s" : ""}</span><span>Dernière mise à jour</span></div>
      <div className="documents-list">
        {isLoading ? <div className="documents-empty">Chargement des documents...</div> : visibleDocuments.length === 0 ? <div className="documents-empty"><FiFile /><strong>Aucun document trouvé</strong><span>Ajoutez un fichier ou modifiez votre recherche.</span></div> : visibleDocuments.map((document) => (
          <article className="document-row" key={document.id}>
            <div className={`document-type type-${getFileKind(document.type).toLowerCase()}`}>{getFileKind(document.type)}</div>
            <div className="document-main"><strong>{document.name}</strong><span>{document.type} · {formatSize(document.sizeBytes)}</span></div>
            <div className={`document-status status-${document.status.toLowerCase()}`}><i />{document.status === "VALIDATED" ? "Validé" : document.status === "DRAFT" ? "Brouillon" : "Archivé"}</div>
            <time>{formatDate(document.createdAt)}</time>
            <div className="document-actions">
              <a href={document.cloudinaryUrl} target="_blank" rel="noreferrer" aria-label={`Télécharger ${document.name}`} title="Ouvrir le document"><FiDownload /></a>
              {canManageDocuments && document.status === "DRAFT" && <button onClick={() => void handleValidate(document.id)} aria-label={`Valider ${document.name}`} title="Valider"><FiCheckCircle /></button>}
              {(canManageDocuments || document.ownerId === currentUser.userId) && <button className="delete-action" onClick={() => void handleDelete(document.id)} aria-label={`Supprimer ${document.name}`} title="Supprimer"><FiTrash2 /></button>}
            </div>
          </article>
        ))}
      </div>

      {isUploadOpen && <div className="documents-modal-backdrop" onClick={() => setIsUploadOpen(false)}>
        <div className="documents-modal" onClick={(event) => event.stopPropagation()}>
          <div className="documents-modal-heading"><div><span className="documents-eyebrow">NOUVEAU FICHIER</span><h2>Ajouter un document</h2></div><button onClick={() => setIsUploadOpen(false)} aria-label="Fermer"><FiX /></button></div>
          <label className="upload-dropzone"><FiUpload /><strong>{selectedFile ? selectedFile.name : "Choisir un fichier"}</strong><span>{selectedFile ? formatSize(selectedFile.size) : "PDF, Word, Excel, image ou archive"}</span><input ref={fileInputRef} type="file" onChange={handleFileChange} /></label>
          <label className="upload-name">Nom affiché <input value={uploadName} onChange={(event) => setUploadName(event.target.value)} placeholder="Ex. Guide utilisateur" /></label>
          <button className="documents-upload-button modal-submit" disabled={!selectedFile || isUploading} onClick={() => void handleUpload()}>{isUploading ? "Téléversement..." : "Téléverser le document"}<FiUpload /></button>
        </div>
      </div>}
    </section>
  );
}
