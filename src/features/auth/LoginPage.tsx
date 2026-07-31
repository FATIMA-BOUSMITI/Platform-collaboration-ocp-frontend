import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { login } from "../../api/authApi.ts";
import { useAuthStore } from "./AuthStore";

import Input from "../../components/Input";
import Button from "../../components/Button";

import "./LoginPage.css";

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

      const response = await login({
        email,
        password,
      });

      if (response.accessToken) {
        localStorage.setItem(
          "accessToken",
          response.accessToken
        );

        navigate("/dashboard");
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
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