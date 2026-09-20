import axiosClient from "./axiosClient";
import axios from "axios";
import type { UserStats } from "../features/dashboard/dashboard.types";
import type { User } from "../types/User.type";
import type { UserProfile } from "../types/auth.types";

export async function getUsersStats(): Promise<UserStats> {
  const response = await axiosClient.get<UserStats>("/users/stats");
  return response.data;
}

export async function getUsers(): Promise<User[]> {
  const response = await axiosClient.get<User[]>("/users");
  return response.data;
}

export async function getUserById(userId: string): Promise<UserProfile> {
  try {
    const response = await axiosClient.get<UserProfile>(`/users/${userId}`);
    return response.data;
  } catch (error) {
    if (!axios.isAxiosError(error) || error.response?.status !== 404) throw error;
    const legacyResponse = await axiosClient.get<UserProfile>(`/users/user/${userId}`);
    return legacyResponse.data;
  }
}

export async function getUserByAuthUserId(authUserId: string): Promise<UserProfile> {
  const response = await axiosClient.get<UserProfile>(`/users/auth/${authUserId}`);
  return response.data;
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  departement: string;
  roleId: string;
}

export async function createUser(request: CreateUserRequest): Promise<User> {
  const response = await axiosClient.post<User>("/users", request);
  return response.data;
}

export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  photoUrl?: string;
  position?: string;
  managerId?: string;
  language?: string;
  timezone?: string;
  departement?: string;
  roleId?: string;
}

export async function updateUser(userId: string, request: UpdateUserRequest): Promise<User> {
  const response = await axiosClient.put<User>(`/users/${userId}`, request);
  return response.data;
}

export async function assignRoles(userId: string, roleIds: string[]): Promise<UserProfile> {
  const response = await axiosClient.post<UserProfile>("/users/assign-roles", { userId, roleIds });
  return response.data;
}

export async function deleteUser(userId: string): Promise<void> {
  await axiosClient.delete(`/users/${userId}`);
}

export interface Departement {
  id: string;
  name: string;
}

export async function getDepartements(): Promise<Departement[]> {
  const response = await axiosClient.get<Departement[]>("/users/departements");
  return response.data;
}
