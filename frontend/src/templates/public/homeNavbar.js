//Import Modules
import { Link } from 'react-router-dom';
//Import Components
import '../../css/Navbar.css';
import Logo from '../../images/Logo.png';
import BackgroundVideo from '../../videos/intro.mov';

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
            <Link className='Link' to='/' id='active'>
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
      <div className='main'>
        <div>
          <h2>
            First Lego League
          </h2>
          <h1>
            PaRaMeRoS
          </h1>
        </div>
      </div>
      <video src={BackgroundVideo} autoPlay muted/>
    </div>
  );
};

export default Navbar;