const bookController = require('../controllers/book.controller');

module.exports = (app) => {
    app.get('/api/books', bookController.getBooks);
    app.get('/api/books/:id', bookController.getBookById);
    app.post('/api/books', bookController.createBook);
    app.put('/api/books/:id', bookController.updateBook);
    app.delete('/api/books/:id', bookController.deleteBook);
}