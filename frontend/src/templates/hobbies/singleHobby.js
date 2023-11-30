//Import Modules
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
//Import Components
import Navbar from './singleHobbyNavbar';
import Footer from '../Footer';
import '../../css/style.css';

const Hobby = () => {
  window.scrollTo(0, 0);

  //Set the useStates
  const [hobby, setPost] = useState({});
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [updateMode, setUpdateMode] = useState(false);

  //Set Ip of the backend/api
  const backend = 'http://localhost:8080/api/';
  const img = 'http://localhost:8080/images/';

  //Get the token from the localStorage
  const token = localStorage.getItem('token');
  //Split the token to get the username
  const name = token.split('?')[0];

  //Get the id of the hobby
  const id = useLocation().pathname.split('/')[2];

  //Set the useEffect
  useEffect(() => {
    const getPost = async () =>{
      const res = await axios.get(backend + 'hobbies/' + id);

      //Wirte the data in the useStates
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(backend + 'hobbies/' + token + '&id=' + id);
      window.location.replace('/hobbies');
    } catch (err) {
      console.log('ERROR');
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(backend + 'hobbies/' + token + '&id=' + id, {
        username: name,
        title: title,
        desc: desc
      })
      window.location.reload();
    } catch (err) {
      console.log('ERROR')
    }
  };

  return (
      <div className='event'>
        <Navbar />
        <br />
        <br />
        <br />
        <br />
        <div className='infos infos2'>
          <div className='info-img'>
            <div className='content'>
              {updateMode ? (
                <form className='writeForm content' onSubmit={handleUpdate}>
                  <input
                    className='writeInput h3'
                    value={title}
                    type='text'
                    autoFocus={true}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <textarea
                    className='writeInput writeText desc'
                    value={desc}
                    type='text'
                    autoFocus={true}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  <button className='writeSubmit' type='submit'>
                    Update
                  </button>
                </form>
              ) : (
                <>
                  <h3>
                    {hobby.title}
                  </h3>
                  <p className='informations'>
                    <p className='a author'>
                      {hobby.username}
                    </p>
                    <time>
                      {new Date(hobby.createdAt).toDateString()}
                    </time>
                  </p>
                  {name && (
                    <div className='buttons'>
                      <button className='edit' onClick={() => setUpdateMode(true)}>
                        Edit
                      </button>
                      <button className='delete' onClick={handleDelete}>
                        Delete
                      </button>
                  </div>
                  )}
                  <p className='desc'>
                    {hobby.desc}
                  </p>
                </>
              )}
            </div>
            {hobby.photo && (
              <img
                className='postImg'
                src={img + hobby.photo}
                alt=''
              />
            )}
          </div>
        </div>
        <Footer />
      </div>
  );
}

export default Hobby;