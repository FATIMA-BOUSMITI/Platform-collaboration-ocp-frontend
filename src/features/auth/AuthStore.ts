import { create } from "zustand";

interface AuthState {

  accessToken: string | null;

  refreshToken: string | null;

  isAuthenticated: boolean;

  login: (access: string, refresh: string) => void;

  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({

  accessToken: localStorage.getItem("accessToken"),

  refreshToken: localStorage.getItem("refreshToken"),

  isAuthenticated: !!localStorage.getItem("accessToken"),

  login: (access, refresh) => {

    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);

    set({
      accessToken: access,
      refreshToken: refresh,
      isAuthenticated: true,
    });
  },

  logout: () => {

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    set({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });
  },

}));