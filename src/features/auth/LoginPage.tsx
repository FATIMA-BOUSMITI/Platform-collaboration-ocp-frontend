import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

import Input from "../../components/Input";
import Button from "../../components/Button";

import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login logic here
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
        <form className="login-form" onSubmit={handleSubmit}>
        <Input
          label="Identifiant / Email"
          placeholder="prenom.nom@ocpgroup.ma"
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Mot de passe"
          type={showPassword ? "text" : "password"}
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          rightIcon={
            showPassword ? (
              <FiEyeOff onClick={() => setShowPassword(false)} />
            ) : (
              <FiEye onClick={() => setShowPassword(true)} />
            )
          }
        />

        <div className="login-options">

          <label className="remember-me">
            <input type="checkbox" />
            Se souvenir de moi
          </label>

          <a href="#">
            Mot de passe oublié ?
          </a>

        </div>

        <Button text="Se connecter" type="submit" />
        </form>
         <div className="bottom-bar">OCP Group · Système d'Information Interne</div>
      </div>
    </div>
  );
}

export default LoginPage;