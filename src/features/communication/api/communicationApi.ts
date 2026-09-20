// features/communication/api/communicationApi.ts
import axiosClient from "../../../api/axiosClient";
import type {
  Conversation,
  Message,
  CreateConversationRequest,
  SendMessageRequest,
} from "../types/communication.types";

export async function getConversationsByUser(userId: string): Promise<Conversation[]> {
  const response = await axiosClient.get<Conversation[]>(`/conversations/user/${userId}`);
  return response.data;
}

export async function createConversation(
  request: CreateConversationRequest
): Promise<Conversation> {
  const response = await axiosClient.post<Conversation>("/conversations", request);
  return response.data;
}

export async function getMessages(conversationId: string): Promise<Message[]> {
  const response = await axiosClient.get<Message[]>(`/conversations/${conversationId}/messages`);
  return response.data;
}

export async function sendMessage(
  conversationId: string,
  request: SendMessageRequest
): Promise<Message> {
  const response = await axiosClient.post<Message>(
    `/conversations/${conversationId}/messages`,
    request
  );
  return response.data;
}

export async function getConversation(conversationId: string): Promise<Conversation> {
  const response = await axiosClient.get<Conversation>(`/conversations/${conversationId}`);
  return response.data;
}

export async function addConversationMember(conversationId: string, userId: string): Promise<void> {
  await axiosClient.post(`/conversations/${conversationId}/members/${userId}`);
}

export async function deleteConversation(conversationId: string): Promise<void> {
  await axiosClient.delete(`/conversations/${conversationId}`);
}