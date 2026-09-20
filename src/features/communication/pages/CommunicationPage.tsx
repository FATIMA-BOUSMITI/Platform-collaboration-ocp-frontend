// features/communication/pages/CommunicationPage.tsx
import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from '../../auth/AuthStore';
import { getConversationsByUser, createConversation, deleteConversation } from "../api/communicationApi";
import { getUsers } from "../../../api/userApi";
import type { Conversation, CreateConversationOptions } from "../types/communication.types";
import type { User } from "../../../types/User.type";
import ConversationSidebar from "../components/ConversationSidebar";
import ChatWindow from "../components/ChatWindow";
import CreateChannelModal from "../components/CreateChannelModal";
import "../styles/Communication.css";

export default function CommunicationPage() {
  const currentUser = useAuthStore((state) => state.user );
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  const loadConversations = useCallback(async () => {
    if (!currentUser) return;
    try {
      const data = await getConversationsByUser(currentUser.userId);
      setConversations(data);
      setActiveConversationId((activeId) => activeId && data.some((item) => item.id === activeId) ? activeId : data[0]?.id ?? null);
      setError("");
    } catch {
      setError("Impossible de charger les conversations.");
    }
  }, [currentUser]);

  useEffect(() => {
    const timer = window.setTimeout(() => void loadConversations(), 0);
    return () => window.clearTimeout(timer);
  }, [loadConversations]);

  useEffect(() => {
    void getUsers().then(setUsers).catch(() => setUsers([]));
  }, []);

  async function handleCreateConversation(options: CreateConversationOptions) {
    if (!currentUser) return;

    try {
      const newConversation = await createConversation({
        type: options.type,
        name: options.name,
        creatorId: currentUser.userId,
        memberIds: options.memberIds,
      });
      setConversations((prev) => [...prev, newConversation]);
      setActiveConversationId(newConversation.id);
      setShowCreateModal(false);
    } catch {
      setError("Impossible de créer la conversation.");
    }
  }

  async function handleDeleteConversation(conversationId: string) {
    const confirmed = window.confirm("Supprimer cette conversation ?");
    if (!confirmed) return;

    try {
      await deleteConversation(conversationId);
      setConversations((prev) => prev.filter((conversation) => conversation.id !== conversationId));
      setActiveConversationId((prev) => prev && prev !== conversationId ? prev : null);
      setError("");
    } catch {
      setError("Impossible de supprimer la conversation.");
    }
  }

  const activeConversation = conversations.find((c) => c.id === activeConversationId);

  if (!currentUser) return null;

  return (
    <div className="communication-page">
      <ConversationSidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={setActiveConversationId}
        onDeleteConversation={handleDeleteConversation}
        onOpenCreateModal={() => setShowCreateModal(true)}
      />

      {error && <div className="communication-error">{error}</div>}

      {activeConversation ? (
        <ChatWindow conversation={activeConversation} currentUserId={currentUser.userId} />
      ) : (
        <div className="chat-empty-state">Sélectionne une conversation</div>
      )}

      {showCreateModal && (
        <CreateChannelModal
          onClose={() => setShowCreateModal(false)}
          users={users}
          currentUserId={currentUser.userId}
          onCreate={handleCreateConversation}
        />
      )}
    </div>
  );
}