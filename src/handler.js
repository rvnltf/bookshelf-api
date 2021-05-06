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

    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku'
        });
        response.code(400);
        return response;
    }
    if (readPage>pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        });
        response.code(400);
        return response;
    }
    
    books.push(newBook);
    const isSuccess = books.filter((book)=>book.id===id).length>0;

    if (isSuccess) {
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
const getAllBookHandler = (request, h) => {
    const {name, reading, finished} = request.query;
    if (name) {
        const book = books.filter(book=>book.name);
        return {
            status: 'success',
            data: {
                books: book.map(book=>({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher
                }))
            }
        }
    }
    if (reading) {
        const book = books.filter(book=>Number(book.reading)===Number(reading));
        return {
            status: 'success',
            data: {
                books: book.map(book=>({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher
                }))
            }            }
    }
    if (finished) {
        const book = books.filter(book=>Number(book.finished)===Number(finished));
        return {
            status: 'success',
            data: {
                books: book.map(book=>({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher
                }))
            }
        }
    }
    return {
        status: 'success',
        data: {
            books: books.map(book=>({
                id: book.id,
                name: book.name,
                publisher: book.publisher
            }))
        }
    }
};

const getByIdBookHandler = (request, h) => {
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
};

const editBookByIdHandler = (request, h) => {
    const {id} = request.params;

    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const updatedAt = new Date().toISOString();
    const finished = pageCount===readPage||false;

    if(!name){
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku'
        });
        response.code(400);
        return response;
    }
    if(readPage>pageCount){
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        });
        response.code(400);
        return response;
    }

    const index = books.findIndex(book=>book.id===id);

    if (index!==-1) {
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            finished,
            reading,
            updatedAt
        };
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui'
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan'
    });
    response.code(404);
    return response;
}

const deleteBookByIdHandler = (request, h) => {
    const {id} = request.params;

    const index = books.findIndex(book=>book.id===id);

    if (index!==-1) {
        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus'
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan'
    });
    response.code(404);
    return response;
}


module.exports = { addBookHandler, getAllBookHandler, getByIdBookHandler, editBookByIdHandler, deleteBookByIdHandler };