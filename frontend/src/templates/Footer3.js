import '../css/Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='space3'></div>
      <br></br>
      <footer>
        <div className='waves'>
          <div className='wave' id='wave1'></div>
          <div className='wave' id='wave2'></div>
          <div className='wave' id='wave3'></div>
          <div className='wave' id='wave4'></div>
        </div>
        <ul className='menu'>
          <li>
            <Link className='Link' to='/'>
              Home
            </Link>
          </li>
          <li>
            <Link className='Link' to='/about'>
              About
            </Link>
          </li>
          <li>
            <Link className='Link' to='/event'>
              Events
            </Link>
          </li>
          <li>
            <Link className='Link' to='/terminal'>
              Log In
            </Link>
          </li>
        </ul>
        <p>©2023 PaRaMeRoS | All Rights Reserved</p>
        <p id='p'><Link className='Link' to='/impressum'>Impressum</Link> <Link className='Link' to='/datenschutz'>Datenschutz</Link></p>
      </footer>
    </div>
  );
}

export default Footer;