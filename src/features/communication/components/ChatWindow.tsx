import { useEffect, useRef, useState, type FormEvent } from "react";
import { getMessages, sendMessage } from "../api/communicationApi";
import type { Conversation, Message } from "../types/communication.types";
import "../styles/Communication.css";
interface ChatWindowProps {
  conversation: Conversation;
  currentUserId: string;
}

const POLL_INTERVAL_MS = 4000;

export default function ChatWindow({ conversation, currentUserId }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchMessages() {
      try {
        const data = await getMessages(conversation.id);
        if (isMounted) setMessages(data);
      } catch (err) {
        console.error("Erreur lors de la récupération des messages :", err);
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
    } catch (err) {
      console.error("Erreur lors de l'envoi du message :", err);
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
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-message ${msg.senderId === currentUserId ? "own-message" : ""}`}
          >
            <p>{msg.content}</p>
            <span className="message-time">
              {new Date(msg.sentAt).toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        ))}
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