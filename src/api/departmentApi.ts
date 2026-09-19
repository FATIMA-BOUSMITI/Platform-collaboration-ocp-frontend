import axiosClient from "./axiosClient";

export interface Department {
  id: string;
  name: string;
  code?: string | null;
  description?: string | null;
  managerId?: string | null;
  status?: "ACTIVE" | "ARCHIVED";
}

export interface DepartmentCreateRequest {
  name: string;
  code?: string;
  description?: string;
  managerId?: string;
  status?: "ACTIVE" | "ARCHIVED";
}

export const getDepartments = async (): Promise<Department[]> => {
  const response = await axiosClient.get<Department[]>("/users/departements");
  return response.data;
};

export const createDepartment = async (
  department: DepartmentCreateRequest
): Promise<Department> => {
  const response = await axiosClient.post<Department>(
    "/users/departements",
    department
  );

  return response.data;
};

export const updateDepartment = async (
  id: string,
  department: DepartmentCreateRequest
): Promise<Department> => {
  const response = await axiosClient.put<Department>(
    `/users/departements/${id}`,
    department
  );

  return response.data;
};

export const deleteDepartment = async (id: string): Promise<void> => {
  await axiosClient.delete(`/users/departements/${id}`);
};
