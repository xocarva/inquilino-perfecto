import './Footer.css'

function Footer() {
    return (
        <footer className='footer'>
            <a title='Facebook' href='https://www.facebook.com' target='_blank ' rel="noopener noreferer"><img className='icon' src='/facebook.png' alt='facebook logo'/></a>
            <a title='Instagram' href='https://www.instagram.com' target='_blank ' rel="noopener noreferer"><img className='icon' src='/instagram.png' alt='instagram logo'/></a>
            <a title='Twitter' href='https://www.twitter.com' target='_blank ' rel="noopener noreferer"><img className='icon' src='/twitter.png' alt='twitter logo' /></a>
        </footer>
    )
}

export default Footer
