import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import promoPicture from '../images/meshari.jpg';

const Register = ({ setIsLoggedin }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    country: 'Kosovo',
  });
  const [emails] = useState([]);
  const [usernames] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users")
      .then((res) => {
        Object.keys(res.data).forEach(function (key, index) {
          emails.push(res.data[key].email);
          usernames.push(res.data[key].username);
        });
      })
      .catch((err) => console.log(err));
  }, [emails, usernames]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emails.includes(user.email)) {
      if (!usernames.includes(user.username)) {
        axios
          .post('http://localhost:8000/register', user)
          .then((res) => {
            setIsLoggedin(true);
            navigate('/login');
          })
          .catch((err) => {
            const errorResponse = err.response.data.errors;
            const errorArr = [];
            for (const key of Object.keys(errorResponse)) {
              errorArr.push(errorResponse[key].message)
            }
            setErrors(errorArr);
          })
      } else {
        setErrors('Username is taken.')
      }
    }
    else {
      setErrors("Email already exists.");
    }
  };

  return (
    <div className="register-form" style={{ marginTop: '3em' }}>
      <div className="promo-pic">
        <h2 style={{alignSelf: 'center'}}>GET STARTED</h2>
        <img src={promoPicture} style={{ height: "400px" }} alt="promo"></img>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="name">
          <input type="text" name="firstname" placeholder="First Name" value={user.firstname} onChange={handleChange} required />
          <input type="text" name="lastname" placeholder="Last Name" value={user.lastname} onChange={handleChange} required />
        </div>
        <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} required />
        <input type="text" name="username" placeholder="Username" value={user.username} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} required />
        <input
          type="password"
          name="confirmPassword"
          placeholder='Confirm Password'
          value={user.confirmPassword}
          onChange={handleChange}
          required
        />
        <div className="country-section">
          <label style={{ margin: "0px" }}>Your location: </label>
          <select value={user.country} name="country" onChange={handleChange} required>
            <option value="Kosovo">Kosovo</option>
            <option value="Albania">Albania</option>
            <option value="North Macedonia">North Macedonia</option>
          </select>
        </div>
        <span className="terms-checkbox">
          <input type="checkbox" name="terms" placeholder="Terms and Conditions" style={{ width: "20px" }} />I agree to the<a href="/" style={{ padding: "0px 3px" }}>Terms of Use</a>and<a href="/" style={{ padding: "0px 3px" }}>Privacy Policy.</a>
        </span>
        <span style={{ color: 'red' }}>{(errors !== null) ? errors : null}</span>
        <button id="styled-button-one" type="submit" name="register" style={{ width: "300px" }}>Register</button>
      </form>
    </div>
  );
};

export default Register;