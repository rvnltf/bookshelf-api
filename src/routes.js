const {addBookHandler, getAllBookHandler, getByIdBookHandler, editBookByIdHandler, deleteBookByIdHandler} = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBookHandler
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getByIdBookHandler
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: editBookByIdHandler
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBookByIdHandler
    }
];

module.exports = routes;