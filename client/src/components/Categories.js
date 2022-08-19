import "bootstrap/dist/css/bootstrap.min.css";
import "./Categories.css";
import { useNavigate } from 'react-router-dom';

const Categories = ({ genres }) => {
  const navigate = useNavigate();
  return (
    <div className="top-categories">
      <h2 style={{ marginBottom: "1.5em" }}>FILTER BOOKS BY GENRE</h2>
      <div className="container3">
        {genres.map((genre, i) => (
          <div className="user-card" key={i}>
            <button type="button" className="btn btn-light" onClick={(e) => navigate('/filter-genres/' + genre)}>
              {genre}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
