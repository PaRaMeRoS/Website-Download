//Import Modules
import { useEffect, useState } from 'react';
import axios from 'axios'
//Import Modules
import Navbar from './hobbiesNavbar';
import Footer from '../Footer'
import Hobby from './hobby';
import '../../css/style.css';

const Hobbies = () => {
  //Set the useState
  const [hobbies, setHobbies] = useState([]);

  //Set Ip of the backend/api
  const backend = 'http://localhost:8080/api/';

  //Set the useEffect
  useEffect(() => {
    const fetchHobbies = async () =>{
      const res = await axios.get(backend + 'hobbies');
      setHobbies(res.data);
    };
    fetchHobbies();
  }, []);

  return (
      <div className='events'>
        <Navbar />
          <div className="info">
          <h3>
            Hobbys hinzufügen?
          </h3>
          <p>
            Mail uns
          </p>
          <br />
          <form action='https://formsubmit.co/PaRaMeRoS@gmx.de' method='POST'>
            <input type='text' name='name'  required placeholder='Kontakt Name' />
            <input type="email" name="email" placeholder="Email Address" required />
            <textarea type='text' name='message'  required placeholder='Dein Hobby' />
            <input type='submit' value='Senden' />
          </form>
        </div>
          {hobbies.map( p => (
            <Hobby hobby={p} />
          ))}
        <Footer />
      </div>
  );
}

export default Hobbies;