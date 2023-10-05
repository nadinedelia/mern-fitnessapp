const express = require('express');
const router = express.Router();
const Exercise = require('../models/exercise.model');

// GET: Retrieve all exercises
router.get('/', async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (error) {
    res.status(400).json({ error: 'Error: ' + error.message });
  }
});

// POST: Add a new exercise
router.post('/add', async (req, res) => {
  try {
    const { username, description, duration, date } = req.body;

    const newExercise = new Exercise({
      username,
      description,
      duration: Number(duration),
      date: Date.parse(date),
    });

    await newExercise.save();
    res.json({ message: 'Exercise added!' });
  } catch (error) {
    res.status(400).json({ error: 'Error: ' + error.message });
  }
});

// GET: Retrieve an exercise by ID
router.get('/:id', async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
      res.status(404).json({ error: 'Exercise not found' });
      return;
    }
    res.json(exercise);
  } catch (error) {
    res.status(400).json({ error: 'Error: ' + error.message });
  }
});

// DELETE: Delete an exercise by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedExercise = await Exercise.findByIdAndDelete(req.params.id);
    if (!deletedExercise) {
      res.status(404).json({ error: 'Exercise not found' });
      return;
    }
    res.json({ message: 'Exercise deleted.' });
  } catch (error) {
    res.status(400).json({ error: 'Error: ' + error.message });
  }
});

// POST: Update an exercise by ID
router.post('/update/:id', async (req, res) => {
  try {
    const { username, description, duration, date } = req.body;

    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
      res.status(404).json({ error: 'Exercise not found' });
      return;
    }

    exercise.username = username;
    exercise.description = description;
    exercise.duration = Number(duration);
    exercise.date = Date.parse(date);

    await exercise.save();
    res.json({ message: 'Exercise updated!' });
  } catch (error) {
    res.status(400).json({ error: 'Error: ' + error.message });
  }
});

module.exports = router;