const mongoose = require('mongoose');

const BookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Book title is required!'],
            // minLength: [3, 'Title should be at least 3 characters long']
        },
        author: {
            type: String,
            required: [true, 'Book author is required!'],
            // minLength: [5, 'Author should be at least 5 characters long']
        },
        description: {
            type: String,
            required: [true, 'Book description is required!'],
            maxLength: [400, 'Description should be max 400 characters long'],
        },
        genre: {
            type: String,
            required: [true, 'Book genre is required!']
        },
        rating: {
            type: String,
            required: [true, 'Book rating is required!'],
        },
        link: {
            type: String,
            required: [true, 'Book link is required!'],
        },
        names: [{
            type: String,
        }],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true
    }
);

const Book = mongoose.model('book', BookSchema);
module.exports = Book;