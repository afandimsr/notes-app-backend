/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
const { nanoid } = require('nanoid');
const notes = require('./notes');
const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload;
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const newNote = {
        title, tags, body, id, createdAt, updatedAt,
    };

    notes.push(newNote);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;
    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });
        // response.header('Access-Control-Allow-Origin', '*');
        response.code(201);
        return response;
    } else {
        const response = h.response({
            status: 'Fail',
            message: 'Catatan gagal ditambahkan',
        });
        response.code(500);
        return response;
    }
};

const getAllNotesHandler = () => ({
    status: 'succes',
    data: {
        notes,
    },
});
const getNotesByIdHandler = (request, h) => {
    const { id } = request.params;
    const note = notes.filter((n) => n.id === id)[0];
    if (note !== undefined) {
        return {
            status: 'succes',
            data: {
                note,
            },
        };
    } else {
        const response = h.response({
            status: 'fail',
            message: 'Catatan tidak ditemukan',
        });
        response.code(404);
        return response;
    }
};
const editNotesByIdHandler = (request, h) => {
    const { id } = request.params;
    const { title, tags, body } = request.payload;
    const updatedAt = new Date().toISOString();
    const index = notes.findIndex((note) => note.id === id);
    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        };
        const response = h.response({
            status: 'Success',
            message: 'Catatan berhasil diperbarui',
        });
        response.code(200);
        return response;
    } else {
        const response = h.response({
            status: 'fail',
            message: 'Catatan gagal diperbarui. id tidak ditemukan',
        });
        response.code(404);
        return response;
    }
    // const note = notes.filter((n) => n.id === id)[0];
};

const deleteNotesById = (request, h) => {
    const { id } = request.params;
    const index = notes.indexOf((note) => note.id === id);
    if (index !== -1) {
        const delNotes = notes.splice(index, 1);
        if (delNotes) {
            const response = h.response({
                status: 'Success',
                message: 'Catatan berhasil dihapus',
            });
            response.code(200);
            return response;
        } else {
            const response = h.response({
                status: 'Fail',
                message: 'Catatan gagal dihapus',
            });
            response.code(403);
            return response;
        }
    } else {
        const response = h.response({
            status: 'Fail',
            message: 'Catatan gagal dihapus, karena id catatan tidak ditemukan',
        });
        response.code(404);
        return response;
    }
};

module.exports = {
    addNoteHandler,
    getAllNotesHandler,
    getNotesByIdHandler,
    editNotesByIdHandler,
    deleteNotesById,
};
