import { Link } from "react-router-dom"

function SearchBar() {
    return (
        <>
            <p>Barra de busqueda</p>
            <Link to="/houses">
                <button>
                    Houses
                </button>
            </Link>
        </>
    )
}

export default SearchBar