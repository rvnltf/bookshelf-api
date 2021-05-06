const {addBookHandler, getAllBook, getByIdBook} = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBook
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getByIdBook
    }
];

module.exports = routes;