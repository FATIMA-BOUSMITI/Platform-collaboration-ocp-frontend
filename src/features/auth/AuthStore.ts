import { create } from "zustand";

interface DecodedUser {
  sub: string;
  userId: string;
  type: string;
  iat: number;
  exp: number;
  email?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  role: string | null;
  user: DecodedUser | null;
  isAuthenticated: boolean;

  login: (access: string, refresh: string, role: string) => void;
  logout: () => void;
}

export function getCurrentUserDisplayInfo(accessToken: string | null): { displayName: string; initials: string; email: string } {
  if (!accessToken) {
    return { displayName: "Utilisateur", initials: "U", email: "" };
  }

  try {
    const payload = accessToken.split(".")[1];
    if (!payload) return { displayName: "Utilisateur", initials: "U", email: "" };

    const decoded = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/"))) as DecodedUser;
    const fullName = [decoded.firstName, decoded.lastName].filter(Boolean).join(" ") || decoded.fullName || decoded.name || "";
    const email = decoded.email || decoded.sub || "";
    const displayName = fullName || email || "Utilisateur";
    const initials = (displayName.match(/[A-ZÀ-ÖØ-Ý]/g) ?? [displayName.charAt(0) ?? "U"]).slice(0, 2).join("").toUpperCase() || "U";

    return { displayName, initials, email };
  } catch {
    return { displayName: "Utilisateur", initials: "U", email: "" };
  }
}

function decodeUserFromToken(token: string): DecodedUser {
  const payload = token.split(".")[1];
  if (!payload) throw new Error("Invalid access token");
  return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
  const base64Payload = token.split(".")[1];
  const normalized = base64Payload
    .replace(/-/g, "+")
    .replace(/_/g, "/");
  const padded = normalized.padEnd(
    normalized.length + ((4 - (normalized.length % 4)) % 4),
    "="
  );

  const decoded = atob(padded);
  const bytes = Uint8Array.from(decoded, (char) => char.charCodeAt(0));
  const text = new TextDecoder().decode(bytes);

  return JSON.parse(text);
}

const storedToken = localStorage.getItem("accessToken");
let storedUser: DecodedUser | null = null;

if (storedToken) {
  try {
    const decodedUser = decodeUserFromToken(storedToken);
    if (decodedUser.exp * 1000 > Date.now()) {
      storedUser = decodedUser;
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("role");
    }
  } catch {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: storedUser ? storedToken : null,
  refreshToken: localStorage.getItem("refreshToken"),
  role: localStorage.getItem("role"),
  isAuthenticated: !!storedUser,
  user: storedUser,

  login: (access, refresh, role) => {
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
    localStorage.setItem("role", role);

    const decodedUser = decodeUserFromToken(access);

    set({
      accessToken: access,
      refreshToken: refresh,
      role: role,
      user: decodedUser,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");

    set({
      accessToken: null,
      refreshToken: null,
      role: null,
      user: null,
      isAuthenticated: false,
    });
  },
}));