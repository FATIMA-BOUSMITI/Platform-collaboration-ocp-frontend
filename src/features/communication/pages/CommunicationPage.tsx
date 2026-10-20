import MentionPicker, {
  textWithMentions,
} from "../../collaboration/MentionPicker";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  FiPlus,
  FiSearch,
  FiSend,
  FiPaperclip,
  FiUsers,
  FiMessageSquare,
  FiDownload,
  FiCheck,
} from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import { useAuthStore } from "../../auth/AuthStore";
import { useRealtime, subscribeRealtime } from "../../collaboration/realtime";
import { directory } from "../../../api/collaborationApi";
import type { Person } from "../../../api/collaborationApi";
import { getProjects } from "../../../api/projectApi";
import { errorMessage } from "../../../api/adminApi";
import {
  getConversationsByUser,
  getMessages,
  createConversation,
  sendMessage,
  markConversationRead,
  uploadAttachment,
  downloadAttachment,
  addConversationMember,
} from "../api/communicationApi";
import type {
  Conversation,
  Message,
  ConversationType,
} from "../types/communication.types";
import { Modal, Feedback, Empty } from "../../admin/AdminUI";
import "../styles/CollaborationChat.css";
const nameOf = (p: Person) =>
  [p.firstName, p.lastName].filter(Boolean).join(" ") || p.email;
export default function CommunicationPage() {
  const userId = useAuthStore((s) => s.user?.userId),
    connected = useRealtime((s) => s.connected);
  const [params, setParams] = useSearchParams();
  const [conversations, setConversations] = useState<Conversation[]>([]),
    [people, setPeople] = useState<Person[]>([]),
    [selected, setSelected] = useState<string | null>(
      params.get("conversation"),
    ),
    [messages, setMessages] = useState<Message[]>([]),
    [loading, setLoading] = useState(true),
    [messageLoading, setMessageLoading] = useState(false),
    [error, setError] = useState(""),
    [mentionIds, setMentionIds] = useState<string[]>([]),
    [text, setText] = useState(""),
    [file, setFile] = useState<File | null>(null),
    [pendingAttachment, setPendingAttachment] = useState<string | null>(null),
    [busy, setBusy] = useState(false),
    [query, setQuery] = useState(""),
    [messageQuery, setMessageQuery] = useState(""),
    [newConversation, setNewConversation] = useState(false),
    [membersOpen, setMembersOpen] = useState(false);
  const end = useRef<HTMLDivElement>(null),
    fileInput = useRef<HTMLInputElement>(null);
  const reloadConversations = useCallback(async () => {
    if (userId) setConversations(await getConversationsByUser(userId));
  }, [userId]);
  useEffect(() => {
    let active = true;
    if (!userId) return;
    Promise.all([getConversationsByUser(userId), directory()])
      .then(([c, p]) => {
        if (active) {
          setConversations(c);
          setPeople(p);
          setSelected((v) => v || c[0]?.id || null);
        }
      })
      .catch((e) => {
        if (active) setError(errorMessage(e));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [userId]);
  useEffect(() => {
    if (!selected) return;
    let active = true;
    getMessages(selected)
      .then(async (data) => {
        if (active) {
          setMessages(data);
          setError("");
          setMessageLoading(false);
          await markConversationRead(selected);
        }
      })
      .catch((e) => {
        if (active) {
          setError(errorMessage(e));
          setMessageLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [selected]);
  useEffect(
    () =>
      subscribeRealtime((signal) => {
        if (signal.kind === "connected") {
          void reloadConversations().catch((e) => setError(errorMessage(e)));
          if (selected)
            void getMessages(selected)
              .then(setMessages)
              .catch((e) => setError(errorMessage(e)));
          return;
        }
        if (!signal.conversationId) return;
        void reloadConversations().catch((e) => setError(errorMessage(e)));
        if (signal.conversationId === selected) {
          void getMessages(selected)
            .then(async (data) => {
              setMessages(data);
              if (signal.kind === "message")
                await markConversationRead(selected);
            })
            .catch((e) => setError(errorMessage(e)));
        }
      }),
    [selected, reloadConversations],
  );
  useEffect(() => {
    end.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length]);
  const personMap = new Map(people.map((p) => [p.id, nameOf(p)]));
  const title = (c: Conversation) =>
    c.type === "PRIVATE"
      ? (c.memberIds || [])
          .filter((id) => id !== userId)
          .map((id) => personMap.get(id) || "Collaborateur")
          .join(", ") ||
        c.name ||
        "Conversation privée"
      : c.name || "Conversation";
  useEffect(() => {
    setText("");
    setMentionIds([]);
    setFile(null);
    setPendingAttachment(null);
    if (fileInput.current) fileInput.current.value = "";
  }, [selected]);
  const current = conversations.find((c) => c.id === selected);
  async function submit() {
    if (!selected || !userId || busy || (!text.trim() && !file)) return;
    setBusy(true);
    setError("");
    try {
      const message = pendingAttachment
        ? { id: pendingAttachment }
        : await sendMessage(selected, {
            senderId: userId,
            content: textWithMentions(
              text.trim() || (file ? "Pièce jointe : " + file.name : ""),
              mentionIds,
              personMap,
            ),
            mentionIds,
          });
      if (file) {
        try {
          await uploadAttachment(selected, message.id, file);
        } catch (e) {
          setPendingAttachment(message.id);
          setMessages(await getMessages(selected));
          setError(
            "Le message est enregistré, mais le fichier n’a pas été joint : " +
              errorMessage(e),
          );
          setText("");
          setMentionIds([]);
          return;
        }
      }
      setMessages(await getMessages(selected));
      setText("");
      setFile(null);
      setMentionIds([]);
      setPendingAttachment(null);
      if (fileInput.current) fileInput.current.value = "";
      await reloadConversations();
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="chat-page">
      <header className="collab-page-heading">
        <div>
          <p className="collab-eyebrow">COLLABORATION</p>
          <h1>Messagerie</h1>
          <p>Échangez avec vos collaborateurs et vos équipes.</p>
        </div>
        <span
          className={connected ? "chat-connection online" : "chat-connection"}
        >
          {connected ? "Temps réel connecté" : "Reconnexion au temps réel…"}
        </span>
      </header>
      <Feedback error={error} />
      <div className="chat-workspace">
        <aside className="chat-conversations">
          <header>
            <h2>Conversations</h2>
            <button
              onClick={() => setNewConversation(true)}
              aria-label="Nouvelle conversation"
            >
              <FiPlus />
            </button>
          </header>
          <label className="chat-search">
            <FiSearch />
            <input
              aria-label="Rechercher une conversation"
              placeholder="Rechercher…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          {loading ? (
            <p role="status">Chargement…</p>
          ) : (
            conversations
              .filter((c) =>
                title(c).toLowerCase().includes(query.toLowerCase()),
              )
              .map((c) => (
                <button
                  key={c.id}
                  className={
                    "chat-conversation " + (selected === c.id ? "selected" : "")
                  }
                  onClick={() => {
                    if (c.id === selected || busy) return;
                    setPendingAttachment(null);
                    setText("");
                    setMentionIds([]);
                    setFile(null);
                    setMessageLoading(true);
                    setSelected(c.id);
                    setMessages([]);
                    setParams({ conversation: c.id });
                    setMessageQuery("");
                  }}
                >
                  <span className="chat-avatar">
                    {c.type === "PRIVATE" ? <FiMessageSquare /> : <FiUsers />}
                  </span>
                  <span>
                    <strong>{title(c)}</strong>
                    <small>
                      {c.type === "PRIVATE"
                        ? "Conversation privée"
                        : c.type === "PROJECT"
                          ? "Discussion de projet"
                          : "Discussion de groupe"}
                    </small>
                  </span>
                </button>
              ))
          )}
          {!loading && !conversations.length && (
            <Empty>Aucune conversation. Commencez un échange.</Empty>
          )}
        </aside>
        <section className="chat-main">
          {current ? (
            <>
              <header className="chat-main-header">
                <div>
                  <h2>{title(current)}</h2>
                  <p>{current.memberIds?.length || 0} participant(s)</p>
                </div>
                <button onClick={() => setMembersOpen(true)}>
                  <FiUsers />
                  Participants
                </button>
              </header>
              <label className="chat-search chat-message-search">
                <FiSearch />
                <input
                  aria-label="Rechercher dans les messages"
                  placeholder="Rechercher dans cette conversation…"
                  value={messageQuery}
                  onChange={(e) => setMessageQuery(e.target.value)}
                />
              </label>
              <div className="chat-messages" aria-live="polite">
                {messageLoading ? (
                  <p role="status">Chargement des messages…</p>
                ) : (
                  messages
                    .filter((m) =>
                      m.content
                        .toLowerCase()
                        .includes(messageQuery.toLowerCase()),
                    )
                    .map((m) => (
                      <article
                        key={m.id}
                        className={
                          "chat-message " +
                          (m.senderId === userId ? "mine" : "")
                        }
                      >
                        <small className="chat-sender">
                          {m.senderId === userId
                            ? "Vous"
                            : personMap.get(m.senderId) || "Collaborateur"}
                        </small>
                        <div className="chat-bubble">
                          <p>{m.content}</p>
                          {m.attachments?.map((a) => (
                            <button
                              key={a.id}
                              className="chat-attachment"
                              onClick={() =>
                                void downloadAttachment(
                                  m.conversationId,
                                  a.id,
                                  a.name,
                                ).catch((e) => setError(errorMessage(e)))
                              }
                            >
                              <FiDownload />
                              {a.name}
                              <small>{Math.ceil(a.size / 1024)} Ko</small>
                            </button>
                          ))}
                        </div>
                        <footer>
                          <time>
                            {m.sentAt
                              ? new Date(m.sentAt).toLocaleTimeString("fr-FR", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })
                              : ""}
                          </time>
                          {m.senderId === userId && (
                            <span>
                              <FiCheck />
                              {m.readBy?.length
                                ? "Lu par " + m.readBy.length
                                : "Envoyé"}
                            </span>
                          )}
                        </footer>
                      </article>
                    ))
                )}
                {!messageLoading && !messages.length && (
                  <Empty>Aucun message. Lancez la conversation.</Empty>
                )}
                <div ref={end} />
              </div>
              <form
                className="chat-compose"
                onSubmit={(e) => {
                  e.preventDefault();
                  void submit();
                }}
              >
                <MentionPicker
                  people={
                    new Map(
                      (current.memberIds || [])
                        .filter((id) => id !== userId)
                        .map((id) => [
                          id,
                          personMap.get(id) || "Collaborateur",
                        ]),
                    )
                  }
                  selected={mentionIds}
                  onChange={setMentionIds}
                  disabled={busy || !!pendingAttachment}
                />
                {file && (
                  <div className="chat-selected-file">
                    {file.name}
                    <button
                      type="button"
                      onClick={() => {
                        setFile(null);
                        setPendingAttachment(null);
                      }}
                      aria-label="Retirer la pièce jointe"
                    >
                      ×
                    </button>
                  </div>
                )}
                <textarea
                  aria-label="Votre message"
                  placeholder="Écrivez votre message…"
                  value={text}
                  maxLength={10000}
                  disabled={busy}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      void submit();
                    }
                  }}
                />
                <input
                  type="file"
                  ref={fileInput}
                  hidden
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f && f.size > 10 * 1024 * 1024) {
                      setError("Le fichier dépasse 10 Mo.");
                      return;
                    }
                    setPendingAttachment(null);
                    setFile(f || null);
                  }}
                />
                <button
                  type="button"
                  disabled={busy}
                  aria-label="Joindre un fichier"
                  onClick={() => fileInput.current?.click()}
                >
                  <FiPaperclip />
                </button>
                <button
                  className="collab-primary"
                  disabled={busy || (!text.trim() && !file)}
                  type="submit"
                >
                  <FiSend />
                  {busy ? "Envoi…" : "Envoyer"}
                </button>
              </form>
            </>
          ) : (
            <Empty>
              Sélectionnez une conversation pour retrouver son historique.
            </Empty>
          )}
        </section>
      </div>
      {newConversation && userId && (
        <ConversationForm
          people={people}
          userId={userId}
          onClose={() => setNewConversation(false)}
          onSaved={async (c) => {
            await reloadConversations();
            setSelected(c.id);
            setParams({ conversation: c.id });
            setNewConversation(false);
          }}
        />
      )}
      {membersOpen && current && (
        <Participants
          conversation={current}
          people={people}
          userId={userId || ""}
          onClose={() => setMembersOpen(false)}
          onChanged={reloadConversations}
        />
      )}
    </section>
  );
}
function ConversationForm({
  people,
  userId,
  onClose,
  onSaved,
}: {
  people: Person[];
  userId: string;
  onClose: () => void;
  onSaved: (c: Conversation) => Promise<void>;
}) {
  const [type, setType] = useState<ConversationType>("PRIVATE"),
    [name, setName] = useState(""),
    [ids, setIds] = useState<string[]>([]),
    [projectId, setProjectId] = useState(""),
    [projects, setProjects] = useState<{ id: string; name: string }[]>([]),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch(() => {});
  }, []);
  return (
    <Modal title="Nouvelle conversation" onClose={onClose} busy={busy}>
      <Feedback error={error} />
      <form
        className="collab-form"
        onSubmit={async (e) => {
          e.preventDefault();
          if (busy) return;
          setBusy(true);
          try {
            await onSaved(
              await createConversation({
                type,
                name: type === "PRIVATE" ? undefined : name.trim(),
                creatorId: userId,
                memberIds: ids,
                projectId: type === "PROJECT" ? projectId : undefined,
              }),
            );
          } catch (err) {
            setError(errorMessage(err));
          } finally {
            setBusy(false);
          }
        }}
      >
        <label>
          Type
          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value as ConversationType);
              setIds([]);
            }}
          >
            <option value="PRIVATE">Conversation privée</option>
            <option value="CHANNEL">Groupe</option>
            <option value="PROJECT">Discussion de projet</option>
          </select>
        </label>
        {type !== "PRIVATE" && (
          <label>
            Nom
            <input
              required
              maxLength={150}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        )}
        {type === "PROJECT" && (
          <label>
            Projet
            <select
              required
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
            >
              <option value="">Sélectionner</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
        )}
        <fieldset>
          <legend>Participants</legend>
          <div className="chat-people">
            {people
              .filter((p) => p.id !== userId)
              .map((p) => (
                <label key={p.id}>
                  <input
                    type={type === "PRIVATE" ? "radio" : "checkbox"}
                    name="participant"
                    checked={ids.includes(p.id)}
                    onChange={(e) =>
                      setIds(
                        type === "PRIVATE"
                          ? [p.id]
                          : e.target.checked
                            ? [...ids, p.id]
                            : ids.filter((id) => id !== p.id),
                      )
                    }
                  />
                  <span>
                    {nameOf(p)}
                    <small>{p.email}</small>
                  </span>
                </label>
              ))}
          </div>
        </fieldset>
        <button disabled={busy || !ids.length} className="collab-primary">
          Créer la conversation
        </button>
      </form>
    </Modal>
  );
}
function Participants({
  conversation,
  people,
  userId,
  onClose,
  onChanged,
}: {
  conversation: Conversation;
  people: Person[];
  userId: string;
  onClose: () => void;
  onChanged: () => Promise<void>;
}) {
  const [id, setId] = useState(""),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  return (
    <Modal title="Participants" onClose={onClose} busy={busy}>
      <Feedback error={error} />
      <ul className="chat-participant-list">
        {(conversation.memberIds || []).map((id) => (
          <li key={id}>
            {people.find((p) => p.id === id)
              ? nameOf(people.find((p) => p.id === id)!)
              : "Collaborateur"}
            {conversation.adminIds?.includes(id) && (
              <small>Administrateur du groupe</small>
            )}
          </li>
        ))}
      </ul>
      {conversation.type !== "PRIVATE" &&
        conversation.adminIds?.includes(userId) && (
          <form
            className="collab-form"
            onSubmit={async (e) => {
              e.preventDefault();
              setBusy(true);
              try {
                await addConversationMember(conversation.id, id);
                await onChanged();
                onClose();
              } catch (err) {
                setError(errorMessage(err));
              } finally {
                setBusy(false);
              }
            }}
          >
            <label>
              Ajouter un participant
              <select
                required
                value={id}
                onChange={(e) => setId(e.target.value)}
              >
                <option value="">Sélectionner</option>
                {people
                  .filter((p) => !conversation.memberIds?.includes(p.id))
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {nameOf(p)}
                    </option>
                  ))}
              </select>
            </label>
            <button className="collab-primary" disabled={busy || !id}>
              Ajouter
            </button>
          </form>
        )}
    </Modal>
  );
}
