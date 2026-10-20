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

export async function markConversationRead(conversationId:string){await axiosClient.patch("/conversations/"+conversationId+"/messages/read");}
export async function uploadAttachment(conversationId:string,messageId:string,file:File){const form=new FormData();form.append("file",file);return (await axiosClient.post("/conversations/"+conversationId+"/messages/"+messageId+"/attachments",form,{headers:{"Content-Type":undefined}})).data;}
export async function downloadAttachment(conversationId:string,id:string,name:string){const response=await axiosClient.get("/conversations/"+conversationId+"/attachments/"+id,{responseType:"blob"});const url=URL.createObjectURL(response.data);const anchor=document.createElement("a");anchor.href=url;anchor.download=name;anchor.click();setTimeout(()=>URL.revokeObjectURL(url),10000);}
