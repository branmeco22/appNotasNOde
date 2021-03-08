const express = require("express");
const router = express.Router();

// Controller
const {
    renderNoteForm,
    createNewNote,
    renderNotes,
    renderEditForm,
    updateNote,
    deleteNote
} = require("../controllers/notes.controller");

// Helpers
const { isAuthenticated } = require("../helpers/auth");

// Nota nueva
router.get("/notes/add", isAuthenticated, renderNoteForm);

router.post("/notes/new-note", isAuthenticated, createNewNote);

// ver todas las notas
router.get("/notes", isAuthenticated, renderNotes);

// Editar notas
router.get("/notes/edit/:id", isAuthenticated, renderEditForm);

router.put("/notes/edit-note/:id", isAuthenticated, updateNote);

// Eliminar Notas
router.delete("/notes/delete/:id", isAuthenticated, deleteNote);

module.exports = router;