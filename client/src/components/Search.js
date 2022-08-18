import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaStar, FaRegStar } from 'react-icons/fa';

const Search = ({ keywords }) => {
    const [resultList, setResultList] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/books", { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                console.log(keywords[0]);
                Object.keys(res.data).forEach(function (key, index) {
                    if (res.data[key].title.toUpperCase().includes(keywords[0].toUpperCase()) || res.data[key].author.toUpperCase().includes(keywords[0].toUpperCase()))
                        resultList.push(res.data[key]);
                });
                console.log(resultList);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="search-container">
        </div>
    );
};

export default Search;