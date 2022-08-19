import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BookList from './components/BookList';
import NewBook from './components/NewBook';
import Book from './components/Book';
import EditBook from './components/EditBook';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Footer from './components/Footer';
import Search from './components/Search';
import FilterAuthors from './components/FilterAuthors';

function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  return (
    <BrowserRouter>
      <div className="App" style={{ minHeight: "100vh" }}>
        <Header isLoggedin={isLoggedin} setIsLoggedin={setIsLoggedin}/>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/new" element={<NewBook setIsLoggedin={setIsLoggedin} />} />
          <Route path="/book/:id" element={<Book setIsLoggedin={setIsLoggedin} />} />
          <Route path="/book/edit/:id" element={<EditBook setIsLoggedin={setIsLoggedin} />} />
          <Route path="/login" element={<Login setIsLoggedin={setIsLoggedin} />} />
          <Route path="/register" element={<Register setIsLoggedin={setIsLoggedin} />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/filter/:author" element={<FilterAuthors />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;