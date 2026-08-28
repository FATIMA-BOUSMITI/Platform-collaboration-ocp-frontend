// features/communication/pages/CommunicationPage.tsx
import { useEffect, useState } from "react";
import { useAuthStore } from '../../auth/AuthStore';
import { getConversationsByUser, createConversation } from "../api/communicationApi";
import type { Conversation } from "../types/communication.types";
import ConversationSidebar from "../components/ConversationSidebar";
import ChatWindow from "../components/ChatWindow";
import CreateChannelModal from "../components/CreateChannelModal";
import "../styles/Communication.css";

export default function CommunicationPage() {
  const currentUser = useAuthStore((state) => state.user );
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    getConversationsByUser(currentUser.userId)
      .then((data) => {
        setConversations(data);
        if (data.length > 0) setActiveConversationId(data[0].id);
      })
      .catch((err) => console.error("Erreur lors du chargement des conversations :", err));
  }, [currentUser]);

  async function handleCreateChannel(name: string, _isPrivate: boolean) {
    if (!currentUser) return;

    try {
      const newConversation = await createConversation({
        type: "CHANNEL",
        name,
        creatorId: currentUser.userId,
        memberIds: [],
      });
      setConversations((prev) => [...prev, newConversation]);
      setActiveConversationId(newConversation.id);
      setShowCreateModal(false);
    } catch (err) {
      console.error("Erreur lors de la création du canal :", err);
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
        onOpenCreateModal={() => setShowCreateModal(true)}
      />

      {activeConversation ? (
        <ChatWindow conversation={activeConversation} currentUserId={currentUser.userId} />
      ) : (
        <div className="chat-empty-state">Sélectionne une conversation</div>
      )}

      {showCreateModal && (
        <CreateChannelModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateChannel}
        />
      )}
    </div>
  );
}