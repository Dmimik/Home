const express = require("express");

const {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

const { validateNote } = require("../middlewares/validator");

const router = express.Router();

router.post("/", validateNote, createNote);
router.get("/", getNotes);
router.get("/:id", getNote);
router.put("/:id", validateNote, updateNote);
router.delete("/:id", deleteNote);

module.exports = router;