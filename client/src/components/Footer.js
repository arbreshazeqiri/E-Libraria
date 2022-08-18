import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "./Footer.css";
import axios from "axios";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
  FaRegEnvelope,
} from "react-icons/fa";

const Footer = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/current-user", { withCredentials: true })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container2">
      <footer>
        <div className="footer-wrap">
          <div className="container first_class">
            <div className="row">
              <div className="col-md-4 col-sm-6">
                <h3>BE THE FIRST TO KNOW</h3>
                <p>
                  Get all the latest information on new Books and Events. Sign
                  up for our newsletter today.
                </p>
              </div>
              <div className="col-md-4 col-sm-6">
                <form className="newsletter">
                  <input type="text" placeholder="Email Address" />
                  <button className="newsletter_submit_btn" type="submit">
                    <i className="fa fa-paper-plane"></i>
                  </button>
                </form>
              </div>
              <div className="col-md-4 col-sm-6">
                <div className="col-md-12">
                  <div className="standard_social_links">
                    <div>
                      <li className="round-btn btn-facebook">
                        <a href="#">
                          <FaFacebook />{" "}
                        </a>
                      </li>
                      <li className="round-btn btn-twitter">
                        <a href="#">
                          <FaTwitter />
                        </a>
                      </li>
                      <li className="round-btn btn-instagram">
                        <a href="#">
                          <FaInstagram />
                        </a>
                      </li>
                      <li className="round-btn btn-whatsapp">
                        <a href="#">
                          <FaWhatsapp />
                        </a>
                      </li>
                      <li className="round-btn btn-envelop">
                        <a href="#">
                          <FaRegEnvelope />
                        </a>
                      </li>
                    </div>
                  </div>
                </div>
                <div className="clearfix"></div>
                <div className="col-md-12"></div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="container-fluid">
              <div className="copyright"> Copyright 2022 </div>
            </div>
          </div>
        </div>
      </footer>

      {/* <div className="socials">
        <FaInstagram />
        <FaTwitter />
        <FaFacebook />
      </div> */}
    </div>
  );
};

export default Footer;
