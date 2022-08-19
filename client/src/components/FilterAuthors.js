import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const FilterAuthors = () => {
    const {author} = useParams();
    const [filterResults, setFilterResults] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/books-by-author/${author}`)
            .then((res) => {
                setFilterResults(res.data);
            })
            .catch((err) => setError(err));
    }, [author]);

    return (
        <div>
            <h3 style={{ textAlign: 'center' }}>Search results:</h3>
            <div className="container">
                {filterResults.map((book) => (
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
            {error ? <span>{error}</span> : null}
        </div>
    );
};

export default FilterAuthors;