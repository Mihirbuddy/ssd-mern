const express = require("express");
const Note = require("../models/Note");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const note = await Note.create({
      title: req.body.title,
      content: req.body.content,
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (_req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;

