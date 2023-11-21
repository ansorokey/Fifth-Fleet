import './Footer.css';

function Footer() {

    return (<div id="footer">
        <div className='links'>
            <a href="https://www.anton-sorokey.com/" target="_blank">
                <i className="fa-solid fa-globe"></i>
                Anton Sorokey
            </a>

            <a href="https://www.linkedin.com/in/antonsorokey/" target="_blank">
                <i className="fa-brands fa-linkedin"></i>
                LinkedIn
            </a>

            <a href="https://github.com/ansorokey" target="_blank">
                <i className="fa-brands fa-github"></i>
                GitHub
            </a>
        </div>

        <p>Anton Sorokey 2023 @AppAcademy</p>
    </div>)
}

export default Footer;
