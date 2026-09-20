import axiosClient from "./axiosClient";

export interface SessionResponse {
  id: string;
  device: string;
  ipAddress: string;
  lastActivity: string;
  currentDevice: boolean;
}

export async function getMySessions(userId: string, currentSessionId: string): Promise<SessionResponse[]> {
  const response = await axiosClient.get<SessionResponse[]>("/sessions/my", {
    params: { userId, currentSessionId },
  });
  return response.data;
}

export async function deleteSession(sessionId: string): Promise<void> {
  await axiosClient.delete(`/sessions/${sessionId}`);
}

export async function deleteOtherSessions(userId: string, currentSessionId: string): Promise<void> {
  await axiosClient.delete("/sessions/others", { params: { userId, currentSessionId } });
}