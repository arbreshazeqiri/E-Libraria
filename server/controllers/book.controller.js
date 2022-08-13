const Book = require('../models/book.model');

module.exports = {
    getBooks: (req, res) => {
        Book.find({}) 
            .then((books) => {
                res.status(201).json(books);
            })
            .catch((err) => {
                console.log('ERROR IN GET ALL BOOKS', err);
                res.status(400).json({ message: 'Something went wrong in find all books', error: err });
        });
    },
    getBookById: (req, res) => {
        Book.findOne({ _id: req.params.id })
            .then((book) => {
                res.json(book)
            })
            .catch((err) => {
                console.log("ERRORR IN GET ONE BOOK", err);
                res.status(400).json({ message: 'Something went wrong in find one book', error: err});
            });
    },
    createBook: (req, res) => {
        Book.create(req.body)
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
            res.status(400).json({ message: "Something went wrong in update book", error: err });
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
    }
};