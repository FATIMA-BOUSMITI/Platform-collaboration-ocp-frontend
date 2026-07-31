import "../styles/SearchBar.css"

import { FiSearch } from "react-icons/fi";

interface Props{

    value?:string ;

    onChange:(value:string)=>void;

}

export default function SearchBar({

    value,

    onChange

}:Props){

    return(

        <div className="search-bar">

            <FiSearch/>

            <input

                placeholder="Rechercher un utilisateur..."

                value={value}

                onChange={(e)=>onChange(e.target.value)}

            />

        </div>

    );

}