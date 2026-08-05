import "../styles/ActionMenu.css";

interface Props{
    onClick?:()=>void;
}

export default function ActionMenu({
    onClick
}:Props){

    return(

        <button
            className="action-menu"
            onClick={onClick}
        >
            ⋯
        </button>

    );

}