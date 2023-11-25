//Import Components
import Navbar from './notFoundNavbar';
import Footer from '../Footer2'
import '../../css/style.css';

const NotFound = () => {
  window.scrollTo(0, 0);
  
  return (
    <div className="not-found">
      <Navbar />
      <Footer />
    </div>
  );
}

export default NotFound;