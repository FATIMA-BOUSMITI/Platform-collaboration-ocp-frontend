import axiosClient from "./axiosClient";

export type DocumentStatus = "DRAFT" | "VALIDATED" | "ARCHIVED";

export interface DocumentResponse {
  id: string;
  name: string;
  type: string;
  sizeBytes: number;
  cloudinaryUrl: string;
  ownerId: string;
  status: DocumentStatus;
  createdAt: string;
}

export async function uploadDocument(file: File, ownerId: string, name?: string): Promise<DocumentResponse> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("ownerId", ownerId);
  if (name) formData.append("name", name);

  const response = await axiosClient.post<DocumentResponse>("/documents", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function getDocuments(): Promise<DocumentResponse[]> {
  const response = await axiosClient.get<DocumentResponse[]>("/documents");
  return response.data;
}

export async function getDocumentsByOwner(ownerId: string): Promise<DocumentResponse[]> {
  const response = await axiosClient.get<DocumentResponse[]>(`/documents/owner/${ownerId}`);
  return response.data;
}

export async function searchDocuments(query: string): Promise<DocumentResponse[]> {
  const response = await axiosClient.get<DocumentResponse[]>("/documents/search", { params: { query } });
  return response.data;
}

export async function validateDocument(documentId: string): Promise<DocumentResponse> {
  const response = await axiosClient.patch<DocumentResponse>(`/documents/${documentId}/validate`);
  return response.data;
}

export async function deleteDocument(documentId: string): Promise<void> {
  await axiosClient.delete(`/documents/${documentId}`);
}