const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount===readPage||false;

    const newBook = {
        id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
    };

    books.push(newBook);

    const isGreater = books.filter((book)=>book.readPage>book.pageCount).length>0;
    const isSuccess = books.filter((book)=>book.id===id).length>0;

    if (isSuccess) {
        if (!name) {
            const response = h.response({
                status: 'fail',
                message: 'Gagal menambahkan buku. Mohon isi nama buku'
            });
            response.code(400);
            return response;
        }
        if (isGreater) {
            const response = h.response({
                status: 'fail',
                message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
            });
            response.code(400);
            return response;
        }
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id
            }
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan'
    });
    response.code(500);
    return response;
};

// eslint-disable-next-line no-unused-vars
const getAllBook = (request, h) => ({
    status: 'success',
    data: {
        books
    }
});

const getByIdBook = (request, h) => {
    const {id} = request.params;

    const book = books.filter(book=>book.id===id)[0];

    if(book!==undefined){
        return {
            status: 'success',
            data: {
                book
            }
        }
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan'
    });
    response.code(404);
    return response;
;}


module.exports = { addBookHandler, getAllBook, getByIdBook };