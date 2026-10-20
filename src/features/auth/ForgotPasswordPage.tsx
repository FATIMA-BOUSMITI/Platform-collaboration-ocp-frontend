import { HiOutlineEnvelope } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { isAxiosError } from "axios";

import Input from "../../components/Input";
import Button from "../../components/Button";
import { forgotPassword } from "../../api/authApi.ts";

import "./ForgotPasswordPage.css";

import { useState } from "react";

interface ApiErrorResponse {
  message?: string;
}

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitted(true);
    setMessage("");
    setError("");

    const normalizedEmail = email.trim();
    if (!normalizedEmail) return;

    setIsSubmitting(true);
    try {
      const response = await forgotPassword({ email: normalizedEmail });
      setMessage(response);
    } catch (requestError: unknown) {
      if (isAxiosError<ApiErrorResponse>(requestError)) {
        setError(
          requestError.response?.data?.message ??
            "Impossible d'envoyer le lien pour le moment. Réessayez plus tard."
        );
      } else {
        setError("Impossible d'envoyer le lien pour le moment. Réessayez plus tard.");
      }
    } finally {
      setIsSubmitting(false);
    }
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
            error={submitted && !email.trim()}
            onChange={(e) => {
              setEmail(e.target.value);
              setMessage("");
              setError("");
            }}
          />

          <Button
            text={isSubmitting ? "Envoi en cours..." : "Envoyer le lien"}
            type="submit"
            disabled={isSubmitting}
          />

        </form>

        {message && <p className="form-feedback success" role="status">{message}</p>}
        {error && <p className="form-feedback failure" role="alert">{error}</p>}

        <Link
          to="/"
          className="back-login"
        >
          ← Retour à la connexion
        </Link>

      </div>

    </div>
  );
}

export default ForgotPasswordPage;