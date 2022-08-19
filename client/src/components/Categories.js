import "bootstrap/dist/css/bootstrap.min.css";
import "./Categories.css";

const Categories = () => {
  return (
    <div className="top-categories">
      <h2 style={{marginBottom: "0.5em"}}>FILTER BOOKS BY GENRE</h2>
      <div className="container3">
        <div className="first">
          <button type="button" className="btn btn-light">
            MYSTERY
          </button>
          <button type="button" className="btn btn-light">
            DRAMA
          </button>
          <button type="button" className="btn btn-light">
            THRILLER
          </button>
          <button type="button" className="btn btn-light">
            PSYCHOLOGY
          </button>
          <button type="button" className="btn btn-light">
            FICTION
          </button>
        </div>
        <div className="second">
          <button type="button" className="btn btn-light">
            ROMANCE
          </button>
          <button type="button" className="btn btn-light">
            NON-FICTION
          </button>
          <button type="button" className="btn btn-light">
            AUTOBIOGRAPHY
          </button>
          <button type="button" className="btn btn-light">
            SELF-HELP
          </button>
        </div>
        <div className="third">
          <button type="button" className="btn btn-light">
            HISTORY
          </button>
          <button type="button" className="btn btn-light">
            HISTORICAL-FICTION
          </button>
          <button type="button" className="btn btn-light">
            CONTEMPORARY
          </button>
          <button type="button" className="btn btn-light">
            FANTASY
          </button>
        </div>
      </div>
    </div>
  );
};

export default Categories;
