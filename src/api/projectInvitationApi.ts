import api from "./axiosClient";
export interface ProjectInvitation {
  id: string;
  projectId: string;
  projectName: string;
  userId: string;
  invitedBy: string;
  status: "PENDING" | "ACCEPTED" | "DECLINED" | "CANCELLED";
  createdAt: string;
}
export const projectInvitationApi = {
  own: async () =>
    (await api.get<ProjectInvitation[]>("/project-invitations")).data,
  list: async (project: string) =>
    (
      await api.get<ProjectInvitation[]>(
        "/projects/" + project + "/invitations",
      )
    ).data,
  invite: async (project: string, userId: string) =>
    (
      await api.post<ProjectInvitation>(
        "/projects/" + project + "/invitations",
        { userId },
      )
    ).data,
  respond: async (id: string, accept: boolean) =>
    (
      await api.patch<ProjectInvitation>("/project-invitations/" + id, {
        accept,
      })
    ).data,
  cancel: async (project: string, id: string) => {
    await api.delete("/projects/" + project + "/invitations/" + id);
  },
};
