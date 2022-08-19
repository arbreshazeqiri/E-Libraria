import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const Search = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("query");
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/books-by-query/${query}`)
            .then((res) => {
                setSearchResults(res.data);
                console.log(res);
            })
            .catch((err) => setError(err));
    }, [query]);

    return (
        <div>
            <h3>Search results:</h3>
            <div className="container">
                {searchResults.map((book) => (
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
            </div >
        </div>
    );
};

export default Search;