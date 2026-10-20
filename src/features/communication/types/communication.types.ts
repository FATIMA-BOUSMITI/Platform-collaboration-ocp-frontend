// features/communication/types/communication.types.ts

export type ConversationType = "PRIVATE" | "TEAM" | "PROJECT" | "CHANNEL";

export interface Conversation {
  id: string;
  type: ConversationType;
  name: string | null;
  createdAt: string;
  projectId?:string;
  memberIds?:string[];
  adminIds?:string[];
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  sentAt: string;
  status: string;
  readBy?:string[];
  attachments?:Attachment[];
}

export interface CreateConversationRequest {
  type: ConversationType;
  name?: string;
  creatorId: string;
  projectId?:string;
  memberIds: string[];
}

export interface CreateConversationOptions {
  type: "PRIVATE" | "CHANNEL";
  name: string;
  memberIds: string[];
}

export interface SendMessageRequest {
  senderId: string;
  content: string;
}
export interface Attachment{id:string;name:string;contentType:string;size:number;}
