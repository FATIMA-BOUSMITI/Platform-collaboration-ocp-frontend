import { HiOutlineEnvelope } from "react-icons/hi2";
import { Link } from "react-router-dom";

import Input from "../../components/Input";
import Button from "../../components/Button";

import "./ForgotPasswordPage.css";

import { useState } from "react";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitted(true);

    if (!email) return;

    // Appel API ici
  };

  return (
    <div className="forgot-page">

      <div className="forgot-card">

        <img
          src="/ocp-logo.png"
          alt="OCP"
          className="forgot-logo"
        />

        <div className="mail-icon">
          <HiOutlineEnvelope />
        </div>

        <h1>Mot de passe oublié</h1>

        <p>
          Saisissez votre adresse e-mail.
          Nous vous enverrons un lien pour
          réinitialiser votre mot de passe.
        </p>

        <form onSubmit={handleSubmit}>

          <Input
            label="Adresse e-mail"
            type="email"
            placeholder="prenom.nom@ocpgroup.ma"
            value={email}
            error={submitted && !email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            text="Envoyer le lien"
            type="submit"
          />

        </form>

        <Link
          to="/login"
          className="back-login"
        >
          ← Retour à la connexion
        </Link>

      </div>

    </div>
  );
}

export default ForgotPasswordPage;