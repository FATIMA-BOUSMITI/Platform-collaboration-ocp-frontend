import api from "./axiosClient";
export interface Notification {
  id: string;
  type: string;
  title: string;
  body: string;
  link: string;
  read: boolean;
  createdAt: string;
}
export interface NotificationPreferences {
  messages: boolean;
  tasks: boolean;
  deadlines: boolean;
}
export const notificationApi = {
  list: async (unread = false, page = 0) =>
    (
      await api.get<Notification[]>("/notifications", {
        params: { unread, page },
      })
    ).data,
  count: async () =>
    (await api.get<{ count: number }>("/notifications/unread-count")).data
      .count,
  read: async (id: string, read: boolean) => {
    await api.patch("/notifications/" + id + "/read", { read });
  },
  readAll: async () => {
    await api.patch("/notifications/read-all");
  },
  preferences: async () =>
    (await api.get<NotificationPreferences>("/notifications/preferences")).data,
  savePreferences: async (value: NotificationPreferences) =>
    (
      await api.put<NotificationPreferences>(
        "/notifications/preferences",
        value,
      )
    ).data,
};
