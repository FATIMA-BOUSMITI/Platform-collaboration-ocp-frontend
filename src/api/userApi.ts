import axiosClient from "./axiosClient";
import type { UserStats } from "../features/dashboard/dashboard.types";

export async function getUsersStats(): Promise<UserStats> {

  const response = await axiosClient.get<UserStats>("/users/stats");
  
  return response.data;
}