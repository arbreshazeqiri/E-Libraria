import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import Categories from "./Categories";
import axios from "axios";
import "./BookList.css";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [authors] = useState([]);
  const [genres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/books")
      .then((res) => {
        setBooks(res.data);
        Object.keys(res.data).forEach(function (key, index) {
          if (!authors.includes(res.data[key].author)) {
            authors.push(res.data[key].author);
          }
          if (!genres.includes(res.data[key].genre)) {
            genres.push(res.data[key].genre);
          }
        });
      })
      .catch((err) => console.log(err));
  }, [authors, genres]);

  return (
    <div className="even-more-container">
      <div className="banner">
        <Carousel className="banner-carousel">
          <Carousel.Item>
            <img src={require("../images/neutral.png")} alt="banner" />
            <span className="banner-quote">
              “Books are the plane, and the train, and the road.
              <br /> They are the destination, and the journey. They are home.”
            </span>
            <span className="banner-author">
              "How Reading Changed My Life" ― Anna Quindlen
            </span>
          </Carousel.Item>
          <Carousel.Item>
            <img src={require("../images/neutral.png")} alt="banner" />
            <span className="banner-quote">
              “We lose ourselves in books. We find ourselves there too.”
            </span>
            <span className="banner-author">― Anonymous</span>
          </Carousel.Item>
        </Carousel>
      </div>
      <h2
        style={{
          marginTop: "1em"
        }}
      >
        EXPLORE OUR DIGITAL LIBRARY
      </h2>
      <div className="container">
        {books.map((book) => (
          <div key={book._id} className="book">
            <div className="front">
              <div className="cover">
                <Link to={`/book/${book._id}`}>
                  <img
                    src={require(`../../../server/public/${book.names[0]}`)}
                    alt={book.title}
                  />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Categories genres={genres} />

      <h2 style={{ marginBottom: "1em" }}>
        FILTER BOOKS BY AUTHOR
      </h2>
      <div className="users-container">
        {authors.map((author, i) => (
          <div className="user-card" key={i}>
            <button type="button" className="btn btn-light" onClick={(e) => navigate('/filter-authors/' + author)}>
              {author}
            </button>
          </div>
        ))}
      </div>

      <h3 className="pre-footer">
        Be part of the community that is transforming reading one
        book at a time.
      </h3>
    </div>
  );
};

export default BookList;
