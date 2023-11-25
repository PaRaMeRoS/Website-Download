//Import Modules
import { Link } from 'react-router-dom';
//Import Components
import '../../css/Navbar2.css';
import Logo from '../../images/Logo.png';

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div className='homescreen2'>
      <header className='header2'>
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
            <Link className='Link' to='/terminal'>
              Terminal
            </Link>
          </li>
          <li
            ><Link className='Link' to='/statistics' id='active'>
              Statistics
            </Link>
          </li>
          <li>
            <Link className='Link' to='/events/create'>
              Events
            </Link>
          </li>
          <li>
            <button className='Link' onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </header>
    </div>  
  );
}

export default Navbar;