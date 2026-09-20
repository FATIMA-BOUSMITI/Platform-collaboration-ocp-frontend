import { useEffect, useRef, useState, type FormEvent } from "react";
import { getUsers } from "../../../api/userApi";
import { getMessages, sendMessage } from "../api/communicationApi";
import type { Conversation, Message } from "../types/communication.types";
import { getInitials } from "../../../utils/person";
import "../styles/Communication.css";
interface ChatWindowProps {
  conversation: Conversation;
  currentUserId: string;
}

const POLL_INTERVAL_MS = 4000;

export default function ChatWindow({ conversation, currentUserId }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const [usersById, setUsersById] = useState<Record<string, { fullName: string; email: string }>>({});
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const users = await getUsers();
        const map = users.reduce<Record<string, { fullName: string; email: string }>>((acc, user) => {
          acc[String(user.id)] = { fullName: user.fullName || user.email || "Utilisateur", email: user.email || "" };
          return acc;
        }, {});
        setUsersById(map);
      } catch {
        setUsersById({});
      }
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function fetchMessages() {
      try {
        const data = await getMessages(conversation.id);
        if (isMounted) setMessages(data);
      } catch {
        if (isMounted) setError("Impossible de charger les messages.");
      }
    }

    fetchMessages();
    const intervalId = setInterval(fetchMessages, POLL_INTERVAL_MS);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [conversation.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(e: FormEvent) {
    e.preventDefault();
    if (!draft.trim()) return;

    try {
      const newMessage = await sendMessage(conversation.id, {
        senderId: currentUserId,
        content: draft.trim(),
      });
      setMessages((prev) => [...prev, newMessage]);
      setDraft("");
      setError("");
    } catch {
      setError("Impossible d'envoyer le message.");
    }
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <span className="chat-icon">#</span>
        <div>
          <h2>{conversation.name}</h2>
          <p>Canal {conversation.type === "CHANNEL" ? "principal" : ""}</p>
        </div>
      </div>

      <div className="chat-messages">
        {error && <div className="communication-error">{error}</div>}
        {messages.map((msg) => {
          const user = usersById[msg.senderId] ?? { fullName: "Utilisateur", email: "" };
          const isOwn = msg.senderId === currentUserId;
          const senderName = isOwn ? "Vous" : user.fullName || user.email || "Utilisateur";
          const initials = getInitials(senderName);

          return (
            <div
              key={msg.id}
              className={`chat-message ${isOwn ? "own-message" : ""}`}
            >
              <div className="message-author">
                <span className="message-avatar">{initials}</span>
                <span>{senderName}</span>
              </div>
              <p>{msg.content}</p>
              <span className="message-time">
                {new Date(msg.sentAt).toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <form className="chat-input-bar" onSubmit={handleSend}>
        <input
          type="text"
          placeholder={`Écrivez un message sur # ${conversation.name}...`}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <button type="submit">➤</button>
      </form>
    </div>
  );
}