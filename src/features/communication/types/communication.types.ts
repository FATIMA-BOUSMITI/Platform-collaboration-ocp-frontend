// features/communication/types/communication.types.ts

export type ConversationType = "PRIVATE" | "TEAM" | "PROJECT" | "CHANNEL";

export interface Conversation {
  id: string;
  type: ConversationType;
  name: string | null;
  createdAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  sentAt: string;
  status: string;
}

export interface CreateConversationRequest {
  type: ConversationType;
  name?: string;
  creatorId: string;
  memberIds: string[];
}

export interface SendMessageRequest {
  senderId: string;
  content: string;
}