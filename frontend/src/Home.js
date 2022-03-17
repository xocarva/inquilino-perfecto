import './Home.css'

const SERVER_URL = process.env.REACT_APP_SERVER_URL

function Home() {
    return (
        <div className='image-home' style={{backgroundImage:`url("${SERVER_URL}/photo-home.jpg")`}}>
            <h2>Descubre las mejores estancias</h2>
        </div>
    )
}

export default Home
