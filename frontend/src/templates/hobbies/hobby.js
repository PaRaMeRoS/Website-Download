//Import Modules
import { Link } from 'react-router-dom';
//Import Components
import '../../css/style.css';

const HobbyTemplate = ({hobby}) => {
  //Set Ip of the backend/api
  const backend = 'http://localhost:8080/api/';
  const img = 'http://localhost:8080/images/';

  return (
    <div className='infos'>
      <div className='info-img'>
        <div className='content'>
          <Link to={'/hobby/' + hobby._id} className='link'>
            <h3>
              {hobby.title}
            </h3>
          </Link>
          <p className='informations'>
            <p className='a author'>
              {hobby.username}
            </p>
            <time>
              {new Date(hobby.createdAt).toDateString()}
            </time>
          </p>
          <p className='desc'>
            {hobby.desc}
          </p>
        </div>
        {hobby.photo && (
          <img
            className='postImg'
            src={img + hobby.photo}
          />
        )}
      </div>
    </div>
  );
}

export default HobbyTemplate;