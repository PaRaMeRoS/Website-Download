//Import Modules
import { useState } from 'react';
import axios from 'axios';
//Import Components
import Navbar from './createEventNavbar';
import '../../css/style.css';

const CreateEvent = () => {
  window.scrollTo(0, 0);

  //Set the useStates
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);

  //Set Ip of the backend/api
  const backend = 'http://127.0.0.1:8080/api/';

  //Get the token from the localStorage
  const token = localStorage.getItem('token');
  //Split the token to get the username and the raw token
  const name = token.split('?')[0];
  const rawToken = token.split('?')[1];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      username: name,
      title,
      desc
    };

    //Check if the there is a file to upload
    if(file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);
      newPost.photo = filename;

      try{
        axios.post(backend + 'upload?' + rawToken, data);
      } catch (err) {
        console.log('ERROR');
      }
    };

    try {
      const res = await axios.post(backend + 'posts/' + token, newPost);
      window.location.replace('/post/' + res.data._id);
    } catch (err) {
      console.log('ERROR');
    };
  };

  return (
    <div className='createEvent'>
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className='infos'>
        <div className='info-img'>
          <div className='content'>      
            <form className='form' onSubmit={handleSubmit}>
              <label htmlFor='file' className='file-img'>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>
              </label>
              <input
                id='file'
                className='file'
                type='file'
                onChange={(e) => setFile(e.target.files[0])}
              />
              <input
                className='tile h3'
                placeholder='Title'
                type='text'
                autoFocus={true}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                className='desc'
                placeholder='Tell your story...'
                type='text'
                autoFocus={true}
                onChange={(e) => setDesc(e.target.value)}
              />
              <button className='submit' type='submit'>Publish</button>
            </form>
          </div>
          {file && (
            <img
              className='writeImg'
              src={URL.createObjectURL(file)}
              alt=''
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;