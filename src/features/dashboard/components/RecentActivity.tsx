import { Link } from "react-router-dom";
import "./RecentActivity.css";

import RecentActivityItem from "./RecentActivityItem";
interface Props {
    to:string
}
function RecentActivity({to}:Props) {

    return (

        <div className="recent-card">

            <div className="recent-header">

                <h2>Activité récente</h2>

                <button>
                  
                   <Link to={to}>Voir tout</Link>

                </button>

            </div>

            <RecentActivityItem

                color="#18c35e"

                title="Connexion réussie"

                subtitle="Sarah Bennani"

                time="Il y a 2 min"

            />

            <RecentActivityItem

                color="#ff9800"

                title="Échec MFA"

                subtitle="Karim Tazi"

                time="Il y a 15 min"

            />

            <RecentActivityItem

                color="#3b82f6"

                title="Mise à jour des politiques de sécurité"

                subtitle="Système"

                time="Il y a 1h"

            />

            <RecentActivityItem

                color="#3b82f6"

                title="Création d'un nouveau rôle (Auditeur)"

                subtitle="Admin Darif"

                time="Il y a 2h"

            />

        </div>

    );

}

export default RecentActivity;