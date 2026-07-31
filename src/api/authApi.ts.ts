
import API from "./axios";



export interface LoginRequest {
    email: string;
    password: string;
}


export const login = async (data: LoginRequest) => {

    const response = await API.post(
        "/auth/login",
        data
    );

    return response.data;
};
export const forgotPassword = async (data: { email: string }) => {
  const response = await API.post(
    "/auth/forgot-password",
    data
  );

  return response.data;
};
export interface ResetPasswordRequest {
    token: string;
    newPassword: string;
}

export const resetPassword = async (
    data: ResetPasswordRequest
) => {
    return API.post(
        "/auth/reset-password",
        data
    );
};