import axiosClient from "./axiosClient";
import axios from "axios";
import type { UserStats } from "../features/dashboard/dashboard.types";
import type { User } from "../types/User.type";
import type { UserProfile } from "../types/auth.types";

export async function getUsersStats(): Promise<UserStats> {
  const response = await axiosClient.get<UserStats>("/users/stats");
  return response.data;
}

export const getUsers = async (): Promise<User[]> => {
  const response = await axiosClient.get<User[]>("/users");
  return response.data;
};

export async function getUserById(userId: string): Promise<UserProfile> {
  const response = await axiosClient.get<UserProfile>(`/users/${userId}`);
  return response.data;
}

export async function getUserByAuthUserId(authUserId: string): Promise<UserProfile> {
  const response = await axiosClient.get<UserProfile>(`/users/auth/${authUserId}`);
  return response.data;
}

export async function getUserById(userId: string):Promise<UserProfile> {
  try {
    const response = await axiosClient.get<UserProfile>(`/users/${userId}`);
    return response.data;
  } catch (error) {
    if (!axios.isAxiosError(error) || error.response?.status !== 404) {
      throw error;
    }

    const legacyResponse = await axiosClient.get<UserProfile>(`/users/user/${userId}`);
    return legacyResponse.data;
  }
}

export interface CreateUserRequest {
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  email?: string;
  enabled?: boolean;
  accountLocked?: boolean;
}

export async function createUser(request: CreateUserRequest): Promise<UserProfile> {
  const response = await axiosClient.post<UserProfile>("/users", request);
  return response.data;
}

export async function updateUser(userId: string, request: UpdateUserRequest): Promise<UserProfile> {
  const response = await axiosClient.put<UserProfile>(`/users/${userId}`, request);
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

export const getDepartements = async (): Promise<Departement[]> => {
  const response = await axiosClient.get<Departement[]>("/users/departements");
  return response.data;
};

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  departement: string;
  roleId: string;
}

export const createUser = async (user: CreateUserRequest): Promise<User> => {
  const response = await axiosClient.post<User>("/users", user);
  return response.data;
};

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

export const updateUser = async (
  id: string,
  user: UpdateUserRequest
): Promise<User> => {
  const response = await axiosClient.put<User>(`/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await axiosClient.delete(`/users/${id}`);
};
