import "./ProfilePage.css";
import { FiMail, FiPhone, FiMapPin, FiShield, FiClock } from "react-icons/fi";

function ProfilePage() {
  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Mon Profil</h1>
        <p>Gérez vos informations personnelles et vos paramètres de sécurité.</p>
      </div>

      <div className="profile-grid">
        <aside className="profile-card profile-card-identity">
          <div className="profile-avatar">AD</div>
          <h2>Ahmed Darif</h2>
          <p className="profile-role">Administrateur Système</p>
          <span className="profile-badge">Compte Actif</span>
        </aside>

        <section className="profile-card profile-card-security">
          <div className="section-title-row">
            <FiShield />
            <h3>Sécurité du compte</h3>
          </div>

          <div className="security-row">
            <div>
              <strong>Mot de passe</strong>
              <p>Dernière modification il y a 3 mois</p>
            </div>
            <button type="button" className="ghost-button">
              Modifier
            </button>
          </div>

          <div className="security-row security-row-enabled">
            <div>
              <strong>Authentification à deux facteurs (2FA)</strong>
              <p>Protège votre compte avec une étape supplémentaire.</p>
            </div>
            <span className="status-enabled">Activé</span>
          </div>
        </section>
      </div>

      <div className="profile-lower-grid">
        <section className="profile-card profile-card-details">
          <h3>Coordonnées</h3>

          <div className="detail-row">
            <FiMail />
            <span>a.darif@ocpgroup.ma</span>
          </div>

          <div className="detail-row">
            <FiPhone />
            <span>+212 6 00 00 00 00</span>
          </div>

          <div className="detail-row">
            <FiMapPin />
            <span>Siège OCP, Casablanca</span>
          </div>
        </section>

        <section className="profile-card profile-card-sessions">
          <div className="section-title-row">
            <FiClock />
            <h3>Sessions récentes</h3>
          </div>

          <div className="session-item active-session">
            <div className="session-device">◫</div>
            <div className="session-info">
              <strong>MacBook Pro — Safari</strong>
              <span>Casablanca, Maroc • En ligne actuellement</span>
            </div>
            <span className="session-tag">Session active</span>
          </div>

          <div className="session-item">
            <div className="session-device">◫</div>
            <div className="session-info">
              <strong>iPhone 14 Pro</strong>
              <span>Rabat, Maroc • Il y a 2 jours</span>
            </div>
            <button type="button" className="disconnect-button">
              Déconnecter
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProfilePage;
