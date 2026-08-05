import "../styles/Pagination.css";

interface Props {

    currentPage:number;

    totalPages:number;

    onPrevious:()=>void;

    onNext:()=>void;

}

export default function Pagination({

    currentPage,

    totalPages,

    onPrevious,

    onNext

}:Props){

    return(

        <div className="pagination">

            <button

                disabled={currentPage===1}

                onClick={onPrevious}

            >

                Précédent

            </button>

            <button

                disabled={currentPage===totalPages}

                onClick={onNext}

            >

                Suivant

            </button>

        </div>

    );

}