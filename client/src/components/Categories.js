import "bootstrap/dist/css/bootstrap.min.css";
import "./Categories.css";

const Categories = () => {
  return (
    <div className="top-categories">
      <h2 style={{marginBottom: "0.5em"}}>TOP CATEGORIES</h2>
      <div className="container3">
        <div className="first">
          <button type="button" className="btn btn-light">
            NOVELA GRAFIKE
          </button>
          <button type="button" className="btn btn-light">
            FITUESIT E ÇMIMEVE
          </button>
          <button type="button" className="btn btn-light">
            LETËRSI SHQIPE
          </button>
          <button type="button" className="btn btn-light">
            GIFT CARDS
          </button>
        </div>
        <div className="second">
          <button type="button" className="btn btn-light">
            NGJARJE TË VËRTETA
          </button>
          <button type="button" className="btn btn-light">
            SHËNDETI MENDOR
          </button>
          <button type="button" className="btn btn-light">
            BIOGRAFI FRYMËZUESE
          </button>
          <button type="button" className="btn btn-light">
            HISTORI DASHURIE
          </button>
        </div>
        <div className="third">
          <button type="button" className="btn btn-light">
            PRINDËRIM
          </button>
          <button type="button" className="btn btn-light">
            LIBRA ASTROLOGJIKE
          </button>
          <button type="button" className="btn btn-light">
            LIBRA GATIMI
          </button>
          <button type="button" className="btn btn-light">
            MËNYRË JETESE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Categories;
