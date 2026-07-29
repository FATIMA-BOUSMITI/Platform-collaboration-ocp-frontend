
import "./QuickActions.css";

import {

    FiUsers,

    FiShield,

    FiActivity

} from "react-icons/fi";

import QuickActionButton from "./QuickActionButton";

function QuickActions(){

    return(

        <div className="quick-card">

            <div className="quick-header">

                <h2>Actions rapides</h2>

            </div>

            <div className="quick-body">

                <QuickActionButton

                    title="Ajouter un utilisateur"

                    icon={<FiUsers/>}
                    to="/users"
                    

                />

                <QuickActionButton

                    title="Gérer les permissions"

                    icon={<FiShield/>}
                    to=""
                />

                <QuickActionButton

                    title="Sauvegarder le système"

                    icon={<FiActivity/>}
                    to=""

                />

            </div>

        </div>

    );

}

export default QuickActions;