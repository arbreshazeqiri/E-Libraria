import { useState, useEffect, React } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ImageUploading from 'react-images-uploading';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditBook = ({ isLoggedin, setIsLoggedin }) => {
    const [user, setUser] = useState(null);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState('');
    const [rating, setRating] = useState('');
    const [link, setLink] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    let [images, setImages] = useState([]);
    let [names, setName] = useState([]);
    const maxNumber = 1;
    let [img, setImg] = useState(0);
    const { id } = useParams();

    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
        setName(imageList.map(image => image.file.name));
    }

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/current-user', { withCredentials: true })
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => console.log(err));
        axios
            .get(`http://localhost:8000/api/books/${id}`)
            .then((res) => {
                console.log(res.data);
                setTitle(res.data.title);
                setAuthor(res.data.author);
                setDescription(res.data.description);
                setGenre(res.data.genre);
                setRating(res.data.rating);
                setLink(res.data.link);
            })
            .catch((err) => console.log('GET BOOK BY ID ERROR', err));
    }, [id, isLoggedin]);

    const uploadImages = () => {
        for (var a = 0; a < images.length; a++) {
            const fd = new FormData();
            fd.append('image', images[a]['file']);
            axios.post('http://localhost:8000/upload', fd
            ).then(res => {
                console.log("Images uploaded successfully");
            });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (images.length > 0) {
            axios
                .put(
                    `http://localhost:8000/api/books/${id}`, {
                    title,
                    author,
                    description,
                    genre,
                    rating,
                    link,
                    names,
                },
                    { withCredentials: true },
                )
                .then((res) => {
                    uploadImages();
                    navigate('/profile/' + user.username);
                })
                .catch((err) => {
                    setErrors(err.response.data.errors);
                    console.log(err.response.data.errors);
                });
        }
        else {
            console.log("Upload at least one image.");
            setImg(1);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", marginTop: "0em" }}>
            <h4 style={{ margin: "0", marginRight: "23.5em", marginBottom: "0.5em" }}>UPDATE {title.toUpperCase()}</h4>
            <div className="app-wrapper">
                <div className="uploaded-images">
                    <ImageUploading
                        multiple
                        value={images}
                        onChange={onChange}
                        maxNumber={maxNumber}
                        dataURLKey="data_url"
                    >
                        {({
                            imageList,
                            onImageUpload,
                            onImageRemoveAll,
                            onImageUpdate,
                            onImageRemove,
                        }) => (
                            <div className="upload__image-wrapper">
                                {img === 1 ? <span className="text-danger" style={{ fontSize: "15px", marginTop: "-1.5em" }}>Upload between 1-4 images.</span>
                                    : <span style={{ fontSize: "15px", marginTop: "-1.5em", color: "transparent" }}>Something</span>}
                                <div className="row2">
                                    {imageList.map((image, index) => (
                                        <div key={index} className="image-item">
                                            <img src={image['data_url']} />
                                            <div className="image-item__btn-wrapper">
                                                <button className="btn btn-primary" id="styled-button-two" style={{ width: "80px" }} onClick={() => onImageUpdate(index)}>Update</button>
                                                <button className="btn btn-danger" id="styled-button-one" style={{ width: "80px" }} onClick={() => onImageRemove(index)}>Remove</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mainbtndiv">
                                    <button className="btn btn-primary" id="styled-button-one"
                                        style={{ width: "160px", height: "40px" }}
                                        onClick={onImageUpload}
                                    >
                                        Upload an image
                                    </button>
                                </div>
                            </div>
                        )}
                    </ImageUploading>
                </div>
                {/* <button className="btn btn-primary" onClick={() => uploadimages()}>Submit Images</button> */}
                <div className="form-wrapper">
                    <form onSubmit={handleSubmit}>
                        <label>Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        {errors.title && <span className="text-danger">{errors.title.message}</span>}
                        <label>Author</label>
                        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
                        {errors.author && <span className="text-danger">{errors.author.message}</span>}
                        <label>Description</label>
                        <textarea value={description} style={{ height: "40px" }} onChange={(e) => setDescription(e.target.value)} />
                        {errors.description && <span className="text-danger">{errors.description.message}</span>}
                        <label>Genre</label>
                        <select value={genre} name="genre" onChange={(e) => setGenre(e.target.value)}>
                            <option value="">Select a genre</option>
                            <option value="Mystery">Mystery</option>
                            <option value="Drama">Drama</option>
                            <option value="Thriller">Thriller</option>
                            <option value="Romance">Romance</option>
                            <option value="Fiction">Fiction</option>
                            <option value="Non-fiction">Non-fiction</option>
                            <option value="Self-help">Self-help</option>
                            <option value="Psychology">Psychology</option>
                            <option value="Autobiography">Autobiography</option>
                        </select>
                        {errors.genre && <span className="text-danger">{errors.genre.message}</span>}
                        <label>Rating</label>
                        <input type="number" value={rating} placeholder="Set an average rating off of Goodreads" onChange={(e) => setRating(e.target.value.toString())} />
                        {errors.rating && <span className="text-danger">{errors.rating.message}</span>}
                        <label>Link</label>
                        <input type="text" value={link} onChange={(e) => setLink(e.target.value)} />
                        {errors.link && <span className="text-danger">{errors.link.message}</span>}
                        <button id="styled-button-one" style={{ width: "300px" }}>Update book</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditBook;