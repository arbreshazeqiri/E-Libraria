import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./BookList.css";
import Carousel from "react-bootstrap/Carousel";
import Categories from "./Categories";
import authorimg from "../images/author2.jpg";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/books", { withCredentials: true })
      .then((res) => {
        setBooks(res.data);
        Object.keys(res.data).forEach(function (key, index) {
          if (!authors.includes(res.data[key].author))
            authors.push(res.data[key].author);
        });
      })
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:8000/api/users", { withCredentials: true })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="even-more-container">
      <div className="banner">
        <Carousel className="banner-carousel">
          <Carousel.Item>
            <img src={require("../images/books2.jpg")} alt="banner" />
            <span className="banner-quote">
              “Books are the plane, and the train, and the road.
              <br /> They are the destination, and the journey. They are home.”
            </span>
            <span className="banner-author">
              How Reading Changed My Life ― Anna Quindlen,
            </span>
          </Carousel.Item>
          <Carousel.Item>
            <img src={require("../images/books.jpg")} alt="banner" />
            <span className="banner-quote">
              “We lose ourselves in books. We find ourselves there too.”
            </span>
            <span className="banner-author">― Anonymous</span>
          </Carousel.Item>
        </Carousel>
      </div>
      <h2
        style={{
          margin: "0",
          marginTop: "0.5em",
          marginRight: "30em",
          marginBottom: "0.5em"
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
      <Categories />

      <h2
      // style={{
      //   margin: "0",
      //   marginLeft: "-1.8em",
      //   marginTop: "0.5em",
      //   marginRight: "26em",
      //   marginBottom: "0.5em",
      // }}
      >
        SOME OF OUR FAVORITE AUTHORS
      </h2>
      <div className="users-container">
        {authors
          .filter((item, index) => index < 7)
          .map((author, i) => (
            <div className="user-card" key={i}>
              <div className="user-card-details">
                {/* <FaUser /> */}
                <img src={authorimg} alt="img" />
                <span style={{ color: "black" }}>
                  <span
                    style={{
                      fontSize: "30px",
                      fontWeight: "bold",
                      marginRight: "5px"
                    }}
                  ></span>
                  {author}
                </span>
              </div>
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
