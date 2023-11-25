//Import Modules
import { Link } from 'react-router-dom';
//Import Components
import Footer from '../Footer';
import Logo from '../../images/Logo.png';
import '../../css/style.css';

const Impressum = () => {
  window.scrollTo(0, 0);

  return (
    <div className="impressum">
      <div className='homescreen0'>
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
      </div>
      <div id="impressum"></div>
      <h1>Impressum</h1>

      <h2>Angaben gem&auml;&szlig; &sect; 5 TMG</h2>
      <p>Erzbischöfliche Pater-Rupert-Mayer Realschule<br />
      Wolfratshauserstr. 30<br />
      82049 Pullach im Isartal</p>
        
      <p><strong>Vertreten durch:</strong><br />
      Ursula Cieslinski<br />
      First Lego League Team PaRaMeRoS</p>
        
      <h2>Kontakt</h2>
      <p>Telefon: 089/74426-182<br />
      Telefax: 089/74426-185<br />
      E-Mail: info@prmrs.de</p>
        
      <h2>Redaktionell verantwortlich</h2>
      <p>Name Nachname</p>
      <Footer />
    </div>
  )
};

export default Impressum;