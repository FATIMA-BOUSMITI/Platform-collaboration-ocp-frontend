import { useState } from "react";
import type { Conversation } from "../types/communication.types";
import "../styles/Communication.css";
interface ConversationSidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onOpenCreateModal: () => void;
}

export default function ConversationSidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onOpenCreateModal,
}: ConversationSidebarProps) {
  const [search, setSearch] = useState("");

  const channels = conversations.filter(
    (c) => c.type === "CHANNEL" || c.type === "TEAM" || c.type === "PROJECT"
  );
  const directMessages = conversations.filter((c) => c.type === "PRIVATE");

  const filteredChannels = channels.filter((c) =>
    c.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside className="conversation-sidebar">
      <div className="sidebar-search">
        <input
          type="text"
          placeholder="Rechercher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-header">
          <span>CANAUX D'ÉQUIPE</span>
          <button onClick={onOpenCreateModal}>+</button>
        </div>
        {filteredChannels.map((conv) => (
          <button
            key={conv.id}
            className={`conversation-item ${conv.id === activeConversationId ? "active" : ""}`}
            onClick={() => onSelectConversation(conv.id)}
          >
            # {conv.name}
          </button>
        ))}
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-header">
          <span>MESSAGES DIRECTS</span>
          <button onClick={onOpenCreateModal}>+</button>
        </div>
        {directMessages.map((conv) => (
          <button
            key={conv.id}
            className={`conversation-item ${conv.id === activeConversationId ? "active" : ""}`}
            onClick={() => onSelectConversation(conv.id)}
          >
            {conv.name}
          </button>
        ))}
      </div>
    </aside>
  );
}