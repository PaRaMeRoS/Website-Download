//Import Modules
import { useEffect, useState } from 'react';
import axios from 'axios'
//Import Modules
import Navbar from './eventsNavbar';
import Footer from '../Footer'
import Event from './event';
import '../../css/style.css';

const Events = () => {
  //Set the useState
  const [posts, setPosts] = useState([]);

  //Set Ip of the backend/api
  const backend = 'http://localhost:8080/api/';

  //Set the useEffect
  useEffect(() => {
    const fetchPosts = async () =>{
      const res = await axios.get(backend + 'posts');
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  return (
      <div className='events'>
        <Navbar />
          {posts.map( p => (
            <Event post={p} />
          ))}
        <Footer />
      </div>
  );
}

export default Events;