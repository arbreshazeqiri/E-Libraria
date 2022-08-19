import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const FilterGenres = () => {
    const { genre } = useParams();
    const [filterResults, setFilterResults] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/books-by-genre/${genre}`)
            .then((res) => {
                setFilterResults(res.data);
            })
            .catch((err) => setError(err));
    }, [genre]);

    return (
        <div>
            <h3 style={{ textAlign: 'center' }}>{genre} books:</h3>
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

export default FilterGenres;