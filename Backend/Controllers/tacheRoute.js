const express = require('express');
const Tache = require('../Models/tache');
const route = express.Router();

route.post('/:projectId/taches', async (req, res) => {
  try {
  
    const { description, dateDebut, dateFin } = req.body;

    if (!description || !dateDebut || !dateFin) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
    }

    // Créer une nouvelle tâche
    const tache = new Tache({
      description,
      dateDebut,
      dateFin,
      projet: req.params.projectId, 
    });

    await tache.save(); 
    res.status(201).json(tache);
  } catch (err) {
    res.status(400).json({ message: err.message }); 
  }
});

// Obtenir toutes les tâches d'un projet
route.get('/:projectId/taches', async (req, res) => {
  try {
    const taches = await Tache.find({ projet: req.params.projectId });
    res.status(200).json(taches); 
  } catch (err) {
    res.status(500).json({ message: err.message }); 
  }
});

// Modifier une tâche
route.put('/:projectId/taches/:taskId', async (req, res) => {
  try {
    const { description, dateDebut, dateFin } = req.body;

    if (!description || !dateDebut || !dateFin) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
    }

    const updatedTask = await Tache.findByIdAndUpdate(
      req.params.taskId,
      { description, dateDebut, dateFin },
      { new: true } 
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Tâche non trouvée.' });
    }

    res.status(200).json(updatedTask); 
  } catch (err) {
    res.status(500).json({ message: err.message }); 
  }
});

// Supprimer une tâche

route.delete('/:projectId/taches/:taskId', async (req, res) => {
  try {
    
    const deletedTask = await Tache.findByIdAndDelete(req.params.taskId); 
    if (!deletedTask) {
      return res.status(404).json({ message: 'Tâche non trouvée.' });
    }
    res.status(200).json({ message: 'Tâche supprimée avec succès.' }); 
  } catch (err) {
    res.status(500).json({ message: err.message }); 
  }
});
module.exports = route;