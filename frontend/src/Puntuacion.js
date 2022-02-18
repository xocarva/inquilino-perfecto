function Puntuacion({ value }) {
    return (
        <span className="puntuacion">
            {value >= 1 ? '★' : '☆'}
            {value >= 2 ? '★' : '☆'}
            {value >= 3 ? '★' : '☆'}
            {value >= 4 ? '★' : '☆'}
            {value >= 5 ? '★' : '☆'}
        </span>
    )
}

export default Puntuacion
