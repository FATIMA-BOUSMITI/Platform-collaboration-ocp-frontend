
import QuickActionButton from "../../dashboard/components/QuickActionButton";
import "../../dashboard/components/QuickActions.css"

import {

    FiUsers,

    FiShield,

    FiActivity

} from "react-icons/fi";



function QuickActions(){

    return(

        <div className="quick-card">

            <div className="quick-header">

                <h2>Actions rapides</h2>

            </div>

            <div className="quick-body">

                <QuickActionButton

                    title="Gérer les membres de l'équipe"

                    icon={<FiUsers/>}
                    to="/membres"
                    

                />

                <QuickActionButton

                    title="Gestion Kanban"

                    icon={<FiShield/>}
                    to="/kanban"
                />

                <QuickActionButton

                    title="Voir Conversations"

                    icon={<FiActivity/>}
                    to="/messages"

                />

            </div>

        </div>

    );

}

export default QuickActions;