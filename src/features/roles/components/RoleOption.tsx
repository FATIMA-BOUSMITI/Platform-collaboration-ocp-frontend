import '../styles/RoleOption.css'

import { MdCheck } from "react-icons/md";

import type { Role } from "../../../types/role.types";

interface Props{

    role:Role;

    selected:boolean;

    onClick:()=>void;

}

export default function RoleOption({

    role,

    selected,

    onClick

}:Props){

    return(

        <div

            className={`role-option ${selected ? "selected" : ""}`}

            onClick={onClick}

        >

            <span>

                {role.name}

            </span>

            {

                selected &&

                <MdCheck/>

            }

        </div>

    );

}