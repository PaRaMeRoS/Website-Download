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
  const backend = 'http://localhost:8080/api/';

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
              <div>
                <label htmlFor='file' className='file-img'>
                  <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                </label>
                <input
                  id='file'
                  className='file'
                  type='file'
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <input
                  className='title title-c h3'
                  placeholder='Title'
                  type='text'
                  autoFocus={true}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <textarea
                className='desc desc-c'
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