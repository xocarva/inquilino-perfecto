import './Home.css'
function Home() {
    return (
        <div className='home-contenedor'>
            <div className='image-home' style={{backgroundImage:`url("http://localhost:3001/home-picture.jpeg")`}}>
                <h3 className='title-home' >Hogar, dulce hogar</h3>
            </div>
        </div>
    )
}

export default Home
