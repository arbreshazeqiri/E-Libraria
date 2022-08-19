const Book = require('../models/book.model');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;
const User = require('../models/user.model');

module.exports = {
    getBooks: (req, res) => {
        Book.find({})
            .populate('createdBy', 'username email')
            .then((books) => {
                res.status(201).json(books);
            })
            .catch((err) => {
                console.log('ERROR IN GET ALL BOOKS', err);
                res.status(400).json({ message: 'Something went wrong in find all books', error: err });
            });
    },
    getBooksByUser: (req, res) => {
        console.log('IS THIS WORKING', req.params.username);
        User.findOne({ username: req.params.username }).then((user) => {
            Book.find({ createdBy: user._id })
                .populate('createdBy', 'username email')
                .then((books) => {
                    console.log('BOOKS:'.books);
                    res.json([books, user]);
                })
                .catch((err) => {
                    console.log('ERROR IN Get all', err);
                    res.status(400).json({ message: 'something went wrong in find all books by user', error: err });
                })
        });
    },
    getBookById: (req, res) => {
        Book.findOne({ _id: req.params.id })
            .then((book) => {
                res.json(book)
            })
            .catch((err) => {
                console.log("ERRORR IN GET ONE BOOK", err);
                res.status(400).json({ message: 'Something went wrong in find one book', error: err });
            });
    },
    getBookByQuery: (req, res) => {
        const q = req.params.query;
        Book.find({ $or: [{ title: { $regex: q, $options: 'i' } }, { author: { $regex: q, $options: 'i' } }] })
            .then((book) => {
                res.status(201).json(book)
            })
            .catch((err) => {
                console.log("ERRORR IN GET ONE BOOK", err);
                res.status(400).json({ message: 'Something went wrong in find one book', error: err });
            });
    },
    createBook: (req, res) => {
        const user = jwt.verify(req.cookies.userToken, SECRET);
        Book.create({ ...req.body, createdBy: user._id })
            .then((newBook) => {
                res
                    .status(201)
                    .json(newBook);
            })
            .catch((err) => {
                console.log("ERROR IN GET CREATE BOOK", err);
                res
                    .status(400)
                    .json({ message: "Something went wrong in create book", errors: err.errors });
            });
    },
    updateBook: (req, res) => {
        Book.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
            .then((book) => {
                res.json(book);
            })
            .catch((err) => {
                console.log("ERROR IN GET UPDATE BOOK", err);
                res.status(400).json({ message: "Something went wrong in update book", errors: err.errors });
            });
    },
    deleteBook: (req, res) => {
        Book.deleteOne({ _id: req.params.id })
            .then((book) => {
                res.json(book);
            })
            .catch((err) => {
                console.log("ERROR IN GET DELETE BOOK", err);
                res.status(400).json({ message: "something went wrong in delete book", error: err });
            });
    },
};