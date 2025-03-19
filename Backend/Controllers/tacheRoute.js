const express = require('express');
const Tache = require('../Models/tache');
const route = express.Router();

route.post('/:projectId/taches', async (req, res) => {
    try {
      const tache = new Tache({ ...req.body, projet: req.params.projectId });
      await tache.save();
      res.status(201).json(tache);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

route.get('/:projectId/taches', async (req, res) => {
  try {
    const taches = await Tache.find({ projet: req.params.projectId });
    res.status(200).json(taches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
route.put('/:projectId/taches/:taskId', async (req, res) => {
    const updatedTask = await Tache.findByIdAndUpdate(req.params.taskId, req.body, { new: true });
    res.json(updatedTask);
  });
  
  route.delete('/:projectId/taches/:taskId', async (req, res) => {
    await Tache.findByIdAndDelete(req.params.taskId);
    res.json({ message: 'Tâche supprimée' });
  });

module.exports = route;