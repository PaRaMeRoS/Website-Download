//Import Modules
import { Link } from 'react-router-dom';
//Import Components
import '../../css/Navbar404.css';
import '../../css/404.css';
import Logo from '../../images/Logo.png';

const Navbar = () => {
  return (
    <div className='homescreen404'>
      <header className='header404'>
        <div>
          <Link className='Link' to='/'>
            <img src={Logo} alt='Logo' />
          </Link>
          <Link className='Link logo' to='/'>
            PaRaMeRoS
          </Link>
        </div>
        <ul className='navigation'>
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
            <Link className='Link' to='/events'>
              Events
            </Link>
          </li>
          <li>
            <Link className='Link' to='/terminal'>
              Log In
            </Link>
          </li>
        </ul>
      </header>
      <div id='notfound'>
        <div class='notfound'>
          <div class='notfound-404'>
            <h1>
              404
            </h1>
            <h2>
              Page not found
            </h2>
          </div>
          <a href='/'>
            Homepage
          </a>
        </div>
      </div>
    </div>
  );
}

export default Navbar;