import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FiArrowLeft, FiEye, FiEyeOff } from "react-icons/fi";
import { isAxiosError } from "axios";

import Input from "../../components/Input";
import Button from "../../components/Button";

import logo from "../../ocp-logo.png";
import { resetPassword } from "../../api/authApi.ts";

import "./ResetPasswordPage.css";

interface ApiErrorResponse {
  message?: string;
}

function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Le lien de réinitialisation est invalide ou incomplet.");
      return;
    }
    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    if (password.length > 72) {
      setError("Le mot de passe ne peut pas dépasser 72 caractères.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setIsSubmitting(true);
    try {
      await resetPassword({
        token,
        newPassword: password,
        confirmedPassword: confirmPassword,
      });
      setSuccess(true);
    } catch (requestError: unknown) {
      if (isAxiosError<ApiErrorResponse>(requestError)) {
        setError(
          requestError.response?.data?.message ??
            "Le lien est invalide ou expiré. Demandez un nouveau lien."
        );
      } else {
        setError("Impossible de réinitialiser le mot de passe. Réessayez.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="reset-page">
      <div className="reset-card">
        <img
          src={logo}
          alt="OCP"
          className="reset-logo"
        />

        <h1>Nouveau mot de passe</h1>

        <p>
          {success
            ? "Votre mot de passe a été modifié. Vous pouvez maintenant vous connecter."
            : "Choisissez un mot de passe robuste pour sécuriser votre compte."}
        </p>

        {!success && token && <form onSubmit={handleSubmit}>
          <Input
            label="Nouveau mot de passe"
            type={showPassword ? "text" : "password"}
            placeholder="********"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            error={false}
            rightIcon={
              <button
                type="button"
                className="eye-button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            }
          />

          <Input
            label="Confirmer le mot de passe"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="********"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError("");
            }}
            error={false}
            rightIcon={
              <button
                type="button"
                className="eye-button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            }
          />

          <Button
            text={isSubmitting ? "Réinitialisation..." : "Réinitialiser le mot de passe"}
            type="submit"
            disabled={isSubmitting}
          />
        </form>}

        {!token && !success && (
          <p className="form-feedback failure" role="alert">
            Le lien de réinitialisation est invalide ou incomplet.
          </p>
        )}
        {error && <p className="form-feedback failure" role="alert">{error}</p>}

        <Link
          to="/"
          className="back-link"
        >
          <FiArrowLeft />
          Retour à la connexion
        </Link>
      </div>
    </div>
  );
}

export default ResetPasswordPage;