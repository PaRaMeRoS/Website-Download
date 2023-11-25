//Import Modules
import { Link } from 'react-router-dom';
//Import Components
import Navbar from './homeNavbar';
import Footer from '../Footer'
import '../../css/style.css';
/*import Run from '../../videos/Run.mp4'*/

const Home = () => {
  window.scrollTo(0, 0);
  
  return (
    <div className="home">
      <Navbar />
      <div className="infos">
        <div className="info-img">
          <div className="content">
            <h3>
              About us
            </h3>
            <p>
              Diese Website ist vom First Lego League Team „PaRaMeRoS“ der Pater Rupert Mayer Realschule.
              Unser Team besteht aus einer Gruppe von engagierten Schülern, die sich für Robotik und Technologie begeistern.
              Wir haben viel gearbeitet, um unser Wissen und unsere Fähigkeiten zu erweitern und uns auf die Wettbewerbe vorzubereiten.
              In den letzten Jahren hat die Pater Rupert Mayer Realschule schon mit vielen Schülern an der First Lego League teilgenommen und haben viele Erfolge erzielt.
              Unsere Vorgänger haben bereits viele Preise gewonnen und erfahrungen gesammelt. <Link to="/about#about" className='a'>Mehr</Link>
            </p>
          </div>
          <img
            src="https://assets.pixolum.com/blog/wp-content/uploads/2020/02/gruppenbild-perspektive-800x507.webp"
            alt="Bild vom Team"
          />
        </div>
        <div className="info">
          <h3>
            HIHIIHIHHIH
          </h3>
          <p>
            Pasture he invited mr company shyness. But when shot real her.
            Chamber her observe visited removal six sending himself boy. At
            exquisite existence if an oh dependent excellent. Are gay head
            need down draw. Misery wonder enable mutual get set oppose the
            uneasy. End why melancholy estimating her had indulgence
            middletons. Say ferrars demands besides her address. Blind going
            you merit few fancy their.
          </p>
        </div>
        <div className="info-img">
          <div className="content">
            <h3>
              HIHIIHIHHIH
            </h3>
            <p>
              Pasture he invited mr company shyness. But when shot real her.
              Chamber her observe visited removal six sending himself boy. At
              exquisite existence if an oh dependent excellent. Are gay head
              need down draw. Misery wonder enable mutual get set oppose the
              uneasy. End why melancholy estimating her had indulgence
              middletons. Say ferrars demands besides her address. Blind going
              you merit few fancy their.
            </p>
          </div>
          <img
            src="https://www.foerderverein-hands-on.de/files/inhalt/fv_de/Shop/FLL_2022.png"
            alt="TEST"
          />
        </div>
        <div className="info-video">
          <div className="content">
            <h3>
              HIHIIHIHHIH
            </h3>
            <p>
              Pasture he invited mr company shyness. But when shot real her.
              Chamber her observe visited removal six sending himself boy. At
              exquisite existence if an oh dependent excellent. Are gay head
              need down draw. Misery wonder enable mutual get set oppose the
              uneasy. End why melancholy estimating her had indulgence
              middletons. Say ferrars demands besides her address. Blind going
              you merit few fancy their.
            </p>
          </div>
          {/*<video controls loop controlsList="play nodownload" src={Run} type="video/mp4" autoPlay />*/}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;