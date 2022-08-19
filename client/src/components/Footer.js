import "./Footer.css";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaRegEnvelope
} from "react-icons/fa";

const Footer = () => {

  return (
    <div className="footer">
      <div className="socials">
        <FaInstagram />
        <FaTwitter />
        <FaFacebook />
        <FaRegEnvelope />
      </div>
    </div>
  );
};

export default Footer;
