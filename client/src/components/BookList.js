import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./BookList.css";
import Carousel from "react-bootstrap/Carousel";
import { FaUser } from "react-icons/fa";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/books", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setBooks(res.data);
        Object.keys(res.data).forEach(function (key, index) {
          authors.push(res.data[key].author);
        });
        console.log(authors, "authors");
      })
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:8000/api/users", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="even-more-container">
      <div className="banner">
        <Carousel className="banner-carousel">
          <Carousel.Item>
            <img src={require("../images/pinkbanner.jpg")} alt="banner" />
            <span className="banner-quote">QUOTE FROM A BOOK</span>
            <span className="banner-author">BOOK NAME, BOOK AUTHOR</span>
            <button id="styled-button-one" className="banner-button">
              Download now
            </button>
          </Carousel.Item>
        </Carousel>
      </div>
      <h2
        style={{
          margin: "0",
          marginTop: "0.5em",
          marginRight: "30em",
          marginBottom: "0.5em",
        }}
      >
        EXPLORE OUR DIGITAL LIBRARY
      </h2>
      <div class="container">
        {books.map((book) => (
          <div key={book._id} class="book">
            <div class="front">
              <div class="cover">
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

      <h2
        style={{
          margin: "0",
          marginLeft: "-1.8em",
          marginTop: "0.5em",
          marginRight: "26em",
          marginBottom: "0.5em",
        }}
      >
        SOME OF OUR FAVORITE AUTHORS
      </h2>
      <div className="users-container">
        {authors
          .filter((item, index) => index < 7)
          .map((author) => (
            <div className="user-card">
              <div className="user-card-details">
                <FaUser />
                <span style={{ color: "black" }}>
                  <span
                    style={{
                      fontSize: "30px",
                      fontWeight: "bold",
                      marginRight: "5px",
                    }}
                  ></span>
                  {author}
                </span>
              </div>
            </div>
          ))}
      </div>
      <h3 className="pre-footer">
        Be part of the community that is transforming our reading experience one
        book at a time.
      </h3>
    </div>
  );
};

export default BookList;
