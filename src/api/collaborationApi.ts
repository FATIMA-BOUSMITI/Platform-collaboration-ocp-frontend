import api from "./axiosClient";
import type { TaskResponse, TaskStatus, TaskRequest } from "./taskApi";
export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}
export interface Column {
  id: string;
  projectId: string;
  name: string;
  status: TaskStatus;
  position: number;
}
export interface BoardTask extends TaskResponse {
  columnId?: string | null;
  position: number;
  version: number;
  comments?: unknown[];
}
export const directory = async () =>
  (await api.get<Person[]>("/users/directory")).data;
export const departmentDirectory = async () =>
  (
    await api.get<{ id: string; name: string }[]>(
      "/users/directory/departments",
    )
  ).data;
export const boardApi = {
  mentionCandidates: async (taskId: string) =>
    (await api.get<string[]>("/tasks/" + taskId + "/mention-candidates")).data,
  columns: async (projectId: string) =>
    (await api.get<Column[]>("/projects/" + projectId + "/columns")).data,
  tasks: async (projectId: string) =>
    (await api.get<BoardTask[]>("/projects/" + projectId + "/tasks")).data,
  createColumn: async (
    projectId: string,
    value: { name: string; status: TaskStatus; position?: number },
  ) =>
    (await api.post<Column>("/projects/" + projectId + "/columns", value)).data,
  updateColumn: async (
    projectId: string,
    id: string,
    value: { name: string; status: TaskStatus; position: number },
  ) =>
    (await api.put<Column>("/projects/" + projectId + "/columns/" + id, value))
      .data,
  deleteColumn: async (projectId: string, id: string) => {
    await api.delete("/projects/" + projectId + "/columns/" + id);
  },
  move: async (task: BoardTask, columnId: string, position: number) =>
    (
      await api.patch<BoardTask>("/tasks/" + task.id + "/move", {
        columnId,
        position,
        expectedVersion: task.version,
      })
    ).data,
  save: async (
    projectId: string,
    value: TaskRequest & { columnId?: string },
    id?: string,
  ) =>
    (id
      ? await api.put<BoardTask>("/tasks/" + id, value)
      : await api.post<BoardTask>("/projects/" + projectId + "/tasks", value)
    ).data,
};
