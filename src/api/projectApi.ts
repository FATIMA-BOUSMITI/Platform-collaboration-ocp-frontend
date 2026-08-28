import axiosClient from "./axiosClient";
import type { Project } from "../features/manager/Kanban/types/Project.Types";

export async function getProjects() {
    const response = await axiosClient.get<Project[]>("/projects");
    return response.data;
}