import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FiArrowLeft, FiEye, FiEyeOff } from "react-icons/fi";

import Input from "../../components/Input";
import Button from "../../components/Button";

import logo from "../../ocp-logo.png";
import { resetPassword } from "../../api/authApi.ts";

import "./ResetPasswordPage.css";

function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!password || !confirmPassword) {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Les mots de passe ne correspondent pas.");
    return;
  }

  if (!token) {
    alert("Lien de réinitialisation invalide.");
    return;
  }

  try {
    await resetPassword({
      token,
      newPassword: password,
    });

    alert("Mot de passe réinitialisé avec succès.");

    // Optionnel : redirection vers la page de connexion
    // navigate("/login");

  } catch (error) {
    console.error(error);
    alert("Une erreur est survenue.");
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
          Choisissez un mot de passe robuste pour sécuriser votre compte.
        </p>

        <form onSubmit={handleSubmit}>
          <Input
            label="Nouveau mot de passe"
            type={showPassword ? "text" : "password"}
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            text="Réinitialiser le mot de passe"
            type="submit"
          />
        </form>

        <Link
          to="/login"
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