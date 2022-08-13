const mongoose = require('mongoose');

const BookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Book title is required!'],
            minLength: [3, 'Title should be at least 3 characters long']
        },
        author: {
            type: String,
            required: [true, 'Book author is required!'],
            minLength: [5, 'Author should be at least 5 characters long']
        },
        price: {
            type: Number,
            required: [true, 'Book price is required!'],
            min: [0, 'Price should be a positive number!']
        },
        image: {
            type: String,
            required: [true, 'Book image is required!']
        },
        description: {
            type: String
        }

    }, 
    {
    timestamps: true
    }
);

const Book = mongoose.model('book', BookSchema);
module.exports = Book;