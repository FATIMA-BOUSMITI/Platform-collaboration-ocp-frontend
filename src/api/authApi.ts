import axiosClient from "./axiosClient";

export interface LoginRequest {
    email: string;
    password: string;
}


export const login = async (data: LoginRequest) => {

    const response = await axiosClient.post(
        "/auth/login",
        data
    );

    return response.data;
};
export const forgotPassword = async (data: { email: string }) => {
  const response = await axiosClient.post<string>(
    "/auth/forgot-password",
    data
  );

  return response.data;
};
export interface ResetPasswordRequest {
    token: string;
    newPassword: string;
    confirmedPassword: string;
}

export const resetPassword = async (
    data: ResetPasswordRequest
) => {
    return axiosClient.post<string>(
        "/auth/reset-password",
        data
    );
};

export interface RefreshTokenRequest{refreshToken:string;}
export async function refreshToken(data:RefreshTokenRequest){return (await axiosClient.post("/auth/refresh-token",data)).data;}
export async function logout(){await axiosClient.post("/auth/logout",{refreshToken:localStorage.getItem("refreshToken")});}
export async function changePassword(data:{oldPassword:string;newPassword:string}){const me=(await axiosClient.get<{credentialId:string}>("/auth/me")).data;await axiosClient.post("/auth/change-password/"+me.credentialId,{currentPassword:data.oldPassword,newPassword:data.newPassword});}
