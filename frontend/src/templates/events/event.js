//Import Modules
import { Link } from 'react-router-dom';
//Import Components
import '../../css/style.css';

const EventTemplate = ({post}) => {
  //Set Ip of the backend/api
  const backend = 'http://localhost:8080/api/';
  const img = 'http://localhost:8080/images/';

  return (
    <div className='infos'>
      <div className='info-img'>
        <div className='content'>
          <Link to={'/post/' + post._id} className='link'>
            <h3>
              {post.title}
            </h3>
          </Link>
          <p className='informations'>
            <p className='a author'>
              {post.username}
            </p>
            <time>
              {new Date(post.createdAt).toDateString()}
            </time>
          </p>
          <p className='desc'>
            {post.desc}
          </p>
        </div>
        {post.photo && (
          <img
            className='postImg'
            src={img + post.photo}
          />
        )}
      </div>
    </div>
  );
}

export default EventTemplate;