import { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="logo-container">
          <img
            src="/ocp-logo.png"
            alt="OCP"
            className="logo"
          />
        </div>

        <h3>Plateforme Collaborative</h3>

        <p className="subtitle">
          Connectez-vous à votre espace sécurisé OCP Group
        </p>

        <Input
          label="Identifiant / E-mail"
          placeholder="prenom.nom@ocpgroup.ma"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Mot de passe"
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="login-options">

          <label className="remember">

            <input type="checkbox" />

            Se souvenir de moi

          </label>

          <a href="#">Mot de passe oublié ?</a>

        </div>

        <Button
          text="Se connecter"
          onClick={() => console.log(email, password)}
        />

      </div>

    </div>
  );
}

export default LoginPage;