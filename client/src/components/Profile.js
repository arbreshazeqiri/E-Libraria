import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaUser } from 'react-icons/fa';

const Profile = () => {
  const { username } = useParams();
  const [name, setName] = useState(null);
  const [bookList, setBookList] = useState([]);
  const [setError] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/books-by-user/${username}`, { withCredentials: true })
      .then((res) => {
        setName(res.data[1].firstname.toUpperCase() + " " + res.data[1].lastname.toUpperCase());
        setBookList(res.data[0]);
      })
      .catch((err) => setError(err));
  }, [username, setError]);

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
      <div className="even-more-profile-container">
        <div className="profile-info">
          <div className="profile-pic">
            <FaUser />
          </div>
          <div className="profile-user-info">
            <h3 style={{ fontWeight: "bold", fontStyle: "italic" }}>{name}</h3>
            <h4>@{username}</h4>
          </div>
        </div>
        <h2 style={{ textAlign: "center" }}>ALL POSTS</h2>
        <div className="profile-container">
          {bookList.map((book) => (
            <div key={book._id} className="profile-card">
              <Link to={`/book/${book._id}`}>
                <img src={require(`../../../server/public/${book.names[0]}`)} alt={book.title} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;