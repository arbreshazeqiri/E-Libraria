import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Categories.css";

const Categories = ({}) => {
  return (
    <div className="top-categories">
      <h3>TOP CATEGORIES</h3>
      <div className="container3">
        <div className="first">
          <button type="button" class="btn btn-light">
            NOVELA GRAFIKE
          </button>
          <button type="button" class="btn btn-light">
            FITUESIT E CMIMEVE
          </button>
          <button type="button" class="btn btn-light">
            LETERSI SHQIPE
          </button>
          <button type="button" class="btn btn-light">
            GIFT CARDS
          </button>
        </div>
        <div className="second">
          <button type="button" class="btn btn-light">
            NGJARJE TE VERTETA
          </button>
          <button type="button" class="btn btn-light">
            SHENDETI MENDOR
          </button>
          <button type="button" class="btn btn-light">
            BIOGRAFI FRYMEZUESE
          </button>
          <button type="button" class="btn btn-light">
            HISTORI DASHURIE
          </button>
        </div>
        <div className="third">
          <button type="button" class="btn btn-light">
            PRINDERIM
          </button>
          <button type="button" class="btn btn-light">
            LIBRA ASTROLOGJIKE
          </button>
          <button type="button" class="btn btn-light">
            LIBRA GATIMI
          </button>
          <button type="button" class="btn btn-light">
            MENYRE JETESE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Categories;
