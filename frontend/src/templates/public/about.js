//Import Components
import Navbar from './aboutNavbar';
import Footer from '../Footer';
import '../../css/style.css';

const About = () => {
  return (
    <div className="about">
      <Navbar />
      <div className="infos">
        <div className="info-img">
          <div className="content">
            <h3 id="about">
              About us
            </h3>
            <p>
              Diese Website ist vom First Lego League Team „PaRaMeRoS“ der Pater Rupert Mayer Realschule.
              Unser Team besteht aus einer Gruppe von engagierten Schülern, die sich für Robotik und Technologie begeistern.
              Wir haben viel gearbeitet, um unser Wissen und unsere Fähigkeiten zu erweitern und uns auf die Wettbewerbe vorzubereiten.
              In den letzten Jahren hat die Pater Rupert Mayer Realschule schon mit vielen Schülern an der First Lego League teilgenommen und haben viele Erfolge erzielt.
              Unsere Vorgänger haben bereits viele Preise gewonnen und erfahrungen gesammelt.<br />
              Unser Ziel ist es, uns ständig zu verbessern und immer anspruchsvollere Projekte in Angriff zu nehmen. Das geht aber auch nur da wir uns ständig mit alten Schülern unterhalten und erfahrung austauschen.
              Wir lernen nicht nur technische Fähigkeiten, sondern auch wichtige Skills wie Teamarbeit, Kommunikation und Zeitmanagement.
              Wir sind stolz darauf, Teil dieses First Lego League Teams zu sein, und zu zeigen was Realschüler auch/besser können.
            </p>
          </div>
          <img
            src="https://assets.pixolum.com/blog/wp-content/uploads/2020/02/gruppenbild-perspektive-800x507.webp"
            alt="Bild vom Team"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;