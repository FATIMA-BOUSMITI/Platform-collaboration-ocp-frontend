import axiosClient from "./axiosClient";

export type TaskStatus = "TODO" | "IN_PROGRESS" | "REVIEW" | "DONE" | "ARCHIVED";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface TaskRequest {
  title: string;
  description: string;
  assigneeId?: string;
  priority: TaskPriority;
  dueDate?: string;
  estimatedTimeMinutes?: number;
}

export interface TaskResponse extends TaskRequest {
  id: string;
  projectId: string;
  status: TaskStatus;
}

export interface SubTaskResponse {
  id: string;
  taskId: string;
  title: string;
  isDone: boolean;
}

export interface CommentResponse {
  id: string;
  taskId: string;
  authorId: string;
  content: string;
  createdAt: string;
}

export async function createTask(projectId: string, request: TaskRequest): Promise<TaskResponse> {
  const response = await axiosClient.post<TaskResponse>(`/projects/${projectId}/tasks`, request);
  return response.data;
}

export async function getProjectTasks(projectId: string, status?: TaskStatus): Promise<TaskResponse[]> {
  const response = await axiosClient.get<TaskResponse[]>(`/projects/${projectId}/tasks`, { params: { status } });
  return response.data;
}

export async function getTask(taskId: string): Promise<TaskResponse> {
  const response = await axiosClient.get<TaskResponse>(`/tasks/${taskId}`);
  return response.data;
}

export async function getTasksByAssignee(userId: string): Promise<TaskResponse[]> {
  const response = await axiosClient.get<TaskResponse[]>(`/tasks/assignee/${userId}`);
  return response.data;
}

export async function updateTask(taskId: string, request: TaskRequest): Promise<TaskResponse> {
  const response = await axiosClient.put<TaskResponse>(`/tasks/${taskId}`, request);
  return response.data;
}

export async function updateTaskStatus(taskId: string, status: TaskStatus): Promise<TaskResponse> {
  const response = await axiosClient.patch<TaskResponse>(`/tasks/${taskId}/status`, { status });
  return response.data;
}

export async function toggleSubTask(subTaskId: string): Promise<SubTaskResponse> {
  const response = await axiosClient.patch<SubTaskResponse>(`/subtasks/${subTaskId}/toggle`);
  return response.data;
}

export async function getTaskComments(taskId: string): Promise<CommentResponse[]> {
  const response = await axiosClient.get<CommentResponse[]>(`/tasks/${taskId}/comments`);
  return response.data;
}

export async function addTaskComment(taskId: string, authorId: string, content: string): Promise<CommentResponse> {
  const response = await axiosClient.post<CommentResponse>(`/tasks/${taskId}/comments`, { authorId, content });
  return response.data;
}

export async function createSubTask(taskId: string, title: string): Promise<SubTaskResponse> {
  const response = await axiosClient.post<SubTaskResponse>(`/tasks/${taskId}/subtasks`, { title });
  return response.data;
}

export async function getSubTasks(taskId: string): Promise<SubTaskResponse[]> {
  const response = await axiosClient.get<SubTaskResponse[]>(`/tasks/${taskId}/subtasks`);
  return response.data;
}