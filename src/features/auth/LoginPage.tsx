import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/authApi.ts";
import Input from "../../components/Input";
import Button from "../../components/Button";
import {jwtDecode} from "jwt-decode";
import {getUserById} from "../../api/userApi.ts";
import type { JwtPayload } from "../../types/auth.types";

import "./LoginPage.css";
import { useAuthStore } from "./AuthStore.ts";

const rolePriority = ["ADMIN", "DIRECTOR", "MANAGER", "EMPLOYEE"] as const;

function resolveRole(
  roleNames: string[] | string | undefined,
  ...fallbackRoles: Array<string[] | string | undefined>
): string | null {
  const roleValues = [roleNames, ...fallbackRoles].flatMap((roles) =>
    roles === undefined ? [] : Array.isArray(roles) ? roles : [roles]
  );

  if (!roleValues.length) {
    return null;
  }

  const normalizedRoles = roleValues.map((roleName) =>
    roleName.trim().toUpperCase().replace(/^ROLE_/, "")
  );

  return rolePriority.find((role) => normalizedRoles.includes(role)) ?? null;
}

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setSubmitted(true);

    if (!email || !password) {
      setError("Veuillez renseigner tous les champs.");
      return;
    }

    try {
      setError("");
      useAuthStore.getState().logout();

      const response = await login({
        email,
        password,
      });

      if (response.accessToken) {
        const payload = jwtDecode<JwtPayload>(response.accessToken);
        if (!payload.userId) {
          throw new Error("Le token ne contient pas d'identifiant utilisateur.");
        }

        localStorage.setItem("accessToken", response.accessToken);
        const user = await getUserById(payload.userId);

        const role = resolveRole(
          user.roleNames,
          user.roleName,
          user.role,
          user.roles
        );
        if (!role) {
          throw new Error("Aucun rôle n'est associé à cet utilisateur.");
        }

      useAuthStore.getState().login(
        response.accessToken,
        response.refreshToken,
        role
       );

        //console.log("Role :", role);
        if (role === "ADMIN") {
          navigate("/dashboard");
         }
        else if (role === "DIRECTOR") {
         navigate("/director");
        }
        else if (role === "MANAGER") {
         navigate("/manager");
      }
      else if (role === "EMPLOYEE") {
        navigate("/employee");
      }
      }
    } catch (error: unknown) {
      setError(
        (typeof error === "object" && error !== null && "response" in error
          ? ((error.response as { data?: { message?: string } }).data?.message)
          : undefined) ||
          (error instanceof Error ? error.message : undefined) ||
          "Une erreur est survenue. Veuillez réessayer."
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="top-bar"></div>

        <div className="logo-container">
          <img
            src="/ocp-logo.png"
            alt="OCP"
            className="logo"
          />
        </div>

        <h1 className="login-title">
          Plateforme Collaborative
        </h1>

        <p className="login-subtitle">
          Connectez-vous à votre espace sécurisé OCP Group
        </p>

        {error && (
          <div className="error-box">
            <span className="error-icon">!</span>
            <span>{error}</span>
          </div>
        )}

        <form
          className="login-form"
          onSubmit={handleSubmit}
        >
          <Input
            label="Identifiant / Email"
            type="email"
            placeholder="prenom.nom@ocpgroup.ma"
            value={email}
            error={submitted && !email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
          />

          <Input
            label="Mot de passe"
            type={showPassword ? "text" : "password"}
            placeholder="********"
            value={password}
            error={submitted && !password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            rightIcon={
              showPassword ? (
                <FiEyeOff
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <FiEye
                  onClick={() => setShowPassword(true)}
                />
              )
            }
          />

          <div className="login-options">
            <label className="remember-me">
              <input type="checkbox" />
              Se souvenir de moi
            </label>

            <a href="/forgot-password">
              Mot de passe oublié ?
            </a>
          </div>

          <Button
            text="Se connecter"
            type="submit"
          />
        </form>

        <div className="bottom-bar">
          OCP Group · Système d'Information Interne
        </div>
      </div>
    </div>
  );
}

export default LoginPage;