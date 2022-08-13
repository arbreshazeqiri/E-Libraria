const mongoose = require('mongoose');

const mongoEndpoint = 'mongodb://localhost/';
const dbName = 'books-db';

mongoose
    .connect(mongoEndpoint + dbName)
    .then(() => console.log(`Connected to the ${dbName}`))
    .catch((err) => console.log('ERROR IN CONNECTION TO DB', err));