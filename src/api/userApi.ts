import axiosClient from "./axiosClient";
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
