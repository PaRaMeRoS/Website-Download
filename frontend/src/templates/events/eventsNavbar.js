//Import Modules
import { Link } from 'react-router-dom';
//Import Components
import '../../css/Navbar.css';
import Logo from '../../images/Logo.png';

const Navbar = () => {
  return (
    <div className='homescreen'>
      <header className='header'>
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
            <Link className='Link' to='/events' id='active'>
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
    </div>
  );
}

export default Navbar;