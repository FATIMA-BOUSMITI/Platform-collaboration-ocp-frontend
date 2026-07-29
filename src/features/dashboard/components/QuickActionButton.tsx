
import { Link } from "react-router-dom";
import "./QuickActionButton.css";

import type { ReactNode } from "react";

interface Props{

    title:string;

    icon:ReactNode;

    to:string;

}

function QuickActionButton({

    title,

    icon,

    to

}:Props){

    return(

        <Link to={to} className="quick-button">
      <span>{title}</span>

      <div className="quick-action-icon">
        {icon}
      </div>
    </Link>
    );

}

export default QuickActionButton;