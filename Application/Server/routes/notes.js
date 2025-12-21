const express = require('express');
const auth = require('../middleware/auth');
const { Note } = require('../models');

const router = express.Router();

// Get all notes for logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const notes = await Note.findAll({
      where: { userId: req.user.id },
      order: [['updated_at', 'DESC']],
    });
    res.json(notes);
  } catch (err) {
    console.error('Get notes error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
 
// Create note
router.post('/', auth, async (req, res) => {
  const { title, content } = req.body;
  if (!title && !content) {
    return res.status(400).json({ message: 'Note cannot be empty' });
  }

  try {
    const note = await Note.create({
      userId: req.user.id,
      title: title || '',
      content: content || '',
    });

    res.status(201).json(note);
  } catch (err) {
    console.error('Create note error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update note
router.put('/:id', auth, async (req, res) => {
  const noteId = req.params.id;
  const { title, content } = req.body;

  try {
    const note = await Note.findOne({
      where: { id: noteId, userId: req.user.id },
    });

    if (!note) return res.status(404).json({ message: 'Note not found' });

    note.title = title || '';
    note.content = content || '';
    await note.save();

    res.json(note);
  } catch (err) {
    console.error('Update note error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete note
router.delete('/:id', auth, async (req, res) => {
  const noteId = req.params.id;

  try {
    const note = await Note.findOne({
      where: { id: noteId, userId: req.user.id },
    });

    if (!note) return res.status(404).json({ message: 'Note not found' });

    await note.destroy();
    res.json({ message: 'Note deleted' });
  } catch (err) {
    console.error('Delete note error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
