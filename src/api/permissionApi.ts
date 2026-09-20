import type { Permission } from "../types/permission.type";
import axiosClient from "./axiosClient";

export async function getPermissions() {
    const response = await axiosClient.get<Permission[]>("/permissions");
    return response.data;
}

export async function getRolePermissions(roleId: string) {
    const response = await axiosClient.get<Permission[]>(
        `/roles/${roleId}/permissions`
    );

    return response.data;
}
export async function updateRolePermissions(roleId: string, permissionIds: string[]) {
    const response = await axiosClient.put(
        `/roles/${roleId}/permissions`,
        { permissionIds }
    );
    return response.data;
}

export interface CreatePermissionRequest {
    name: string;
    description: string;
}

export async function createPermission(request: CreatePermissionRequest): Promise<Permission> {
    const response = await axiosClient.post<Permission>("/permissions", request);
    return response.data;
}

export async function getPermissionById(permissionId: string): Promise<Permission> {
    const response = await axiosClient.get<Permission>(`/permissions/${permissionId}`);
    return response.data;
}