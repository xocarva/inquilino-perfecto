function Rating({ value, className }) {
    return (
        <span className={`puntuacion-${className}`}>
            {value >= 1 ? '★' : '☆'}
            {value >= 2 ? '★' : '☆'}
            {value >= 3 ? '★' : '☆'}
            {value >= 4 ? '★' : '☆'}
            {value >= 5 ? '★' : '☆'}
        </span>
    )
}

export default Rating
