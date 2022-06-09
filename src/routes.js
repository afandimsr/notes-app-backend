/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
const { addNoteHandler,
    getAllNotesHandler,
    getNotesByIdHandler,
    editNotesByIdHandler,
    deleteNotesById } = require('./handler');
const routes = [
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler,
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNotesByIdHandler,
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNotesByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNotesById,
    },
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler,
        // options: {
        //     cors: {
        //         origin: ['*'],
        //     },
        // },
    },
];

module.exports = routes;
