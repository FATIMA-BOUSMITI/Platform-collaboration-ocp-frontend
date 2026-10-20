import axiosClient from "./axiosClient";
import type { Project } from "../features/manager/Kanban/types/Project.Types";

export async function getProjects() {
    const response = await axiosClient.get<Project[]>("/projects");
    return response.data;
}

export interface ProjectRequest {
    name: string;
    description: string;
    responsableId: string;
    departmentId: string;
    startDate: string;
    endDate: string;
    priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    budget: number;
}

function projectPayload(request: Partial<ProjectRequest>) {
 const { responsableId, priority, ...fields } = request;
 return { ...fields, ...(responsableId !== undefined ? { responsibleId: responsableId } : {}), ...(priority !== undefined ? { projectPriority: priority } : {}) };
}
export async function createProject(request: ProjectRequest): Promise<Project> {
    const response = await axiosClient.post<Project>("/projects", projectPayload(request));
    return response.data;
}

export async function getProject(projectId: string): Promise<Project> {
    const response = await axiosClient.get<Project>(`/projects/${projectId}`);
    return response.data;
}

export async function getProjectsByDepartment(departmentId: string): Promise<Project[]> {
    const response = await axiosClient.get<Project[]>(`/projects/department/${departmentId}`);
    return response.data;
}

export async function updateProject(projectId: string, request: Partial<ProjectRequest>): Promise<Project> {
    const response = await axiosClient.put<Project>(`/projects/${projectId}`, projectPayload(request));
    return response.data;
}

export async function updateProjectStatus(projectId: string, status: string): Promise<Project> {
    const response = await axiosClient.patch<Project>(`/projects/${projectId}/status`, { status });
    return response.data;
}

export async function archiveProject(projectId: string): Promise<void> {
    await axiosClient.post(`/projects/${projectId}/archive`);
}