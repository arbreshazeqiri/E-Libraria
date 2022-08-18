import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsFillCloudDownloadFill } from "react-icons/bs";
import { GiBookCover } from "react-icons/gi";

const Book = ({ isLoggedin, setIsLoggedin }) => {
  const [book, setBook] = useState({});
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [creator, setCreator] = useState(null);
  const { id } = useParams();
  const [length, setLength] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/books/${id}`)
      .then((res) => {
        console.log(res.data);
        setBook(res.data);
        setLength(res.data.names.length);
        setCreator(res.data.createdBy);
      })
      .catch((err) => console.log("GET MOVIE BY ID ERROR", err));
    axios
      .get("http://localhost:8000/api/current-user", { withCredentials: true })
      .then((res) => {
        setUser(res.data);
        setUserId(res.data._id);
      })
      .catch((err) => console.log(err));
  }, [id, isLoggedin]);

  const deleteBook = (bookId) => {
    for (var a = 0; a < book.names.length; a++) {
      console.log(book.names[a]);
      let name = book.names[a];
      axios.delete(`http://localhost:8000/delete/${name}`).then((res) => {
        console.log("Images deleted successfully");
        axios
          .delete(`http://localhost:8000/api/books/${id}`)
          .then((res) => {
            navigate("/");
          })
          .catch((err) => console.log(err));
      });
    }
  };

  const runCallback = (cb) => {
    return cb();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", marginTop: "0em" }}>
      <h4 style={{ fontSize: "28px", marginTop: "28px" }}>
        BOOK DETAILS <GiBookCover />
      </h4>
      <div
        className="app-wrapper"
        style={{
          border: "1px solid #7ba1c247",
          borderRadius: "50px",
          margin: "30px auto",
          backgroundColor: "#7ba1c217"
        }}
      >
        <div className="uploaded-images">
          <Carousel className="slides">
            {runCallback(() => {
              const row = [];
              for (var i = 0; i < length; i++) {
                row.push(
                  <Carousel.Item key={i}>
                    <img
                      id="book-pic"
                      src={require(`../../../server/public/${book.names[i]}`)}
                      alt="smth"
                    ></img>
                  </Carousel.Item>
                );
              }
              return row;
            })}
          </Carousel>
        </div>
        <div
          className="form-wrapper"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5em",
            fontStyle: "italic"
          }}
        >
          <h2>{book.title}</h2>
          <h3 style={{ color: "#7ba1c2" }}>{book.author}</h3>
          <p>{book.description}</p>
          <table style={{ textAlign: "left" }}>
            <tr>
              <td style={{ fontWeight: "bold" }}>Genre:</td>
              <td>{book.genre}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold" }}>Rating:</td>
              <td>{book.rating}/5</td>
            </tr>
          </table>
          <p
            class="btn btn-secondary"
            style={{
              marginTop: "20px",
              backgroundColor: "#7ba1c2e0",
              border: "none"
            }}
          >
            <a
              href={book.link}
              target="_blank"
              style={{ color: "white", textDecoration: "none" }}
            >
              Download book <BsFillCloudDownloadFill />
            </a>
          </p>
          {console.log(creator, user)}
          {creator === userId ? (
            <div className="details-buttons">
              <button id="styled-button-one">
                <Link
                  to={`/book/edit/${book._id}`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Edit
                </Link>
              </button>
              <button id="styled-button-two" onClick={deleteBook}>
                Delete
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Book;
