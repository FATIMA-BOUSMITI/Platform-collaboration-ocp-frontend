import axiosClient from "./axiosClient";
import type { UserStats } from "../features/dashboard/dashboard.types";
import type { User } from "../types/User.type";

export async function getUsersStats(): Promise<UserStats> {

  const response = await axiosClient.get<UserStats>("/users/stats");
  
  return response.data;
}

export async function getUsers():Promise<User[]>{
  
  const response = await axiosClient.get<User[]>("/users");

  return response.data;
}