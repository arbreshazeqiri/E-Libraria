import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Login = ({ setIsLoggedin }) => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8000/login', user, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                setIsLoggedin(true);
                navigate('/');
            })
            .catch((err) => {
                setErrors(err.response.data.error);
            });
    };
    return (<div className="login-form">
        <form onSubmit={handleSubmit}>
        <h2>LOG IN TO CONTINUE</h2>
            <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} required />
            {errors && <span className="text-danger">{errors}</span>}
            <button id="styled-button-two" style={{width: "300px"}}>Log in</button>
        </form>
        <span>Don't have an account?</span>
        <button id="styled-button-one" style={{width: "300px"}}><NavLink className="nav-link" to="/register">Sign up</NavLink></button>
    </div>
    );
};

export default Login;