// routes/resourceRoutes.js
const express = require('express');
const route = express.Router();
const Tache = require('../Models/tache');
const Resource = require('../Models/ressource');

route.post('/tache/:taskId/ressources', async (req, res) => {
    try {
      const { nom,type, quantite } = req.body;
      const taskId = req.params.taskId;
      const tache = await Tache.findById(taskId);
      if (!tache) {
        return res.status(404).json({ message: 'Tâche non trouvée.' });
      }
  
      // Créer une nouvelle ressource
      const ressource = new Resource({
        nom,
        quantite,
        type,
        tache: taskId, 
      });
  
      await ressource.save(); 
      res.status(201).json(ressource); 
    } catch (err) {
      console.error('Erreur lors de l\'ajout de la ressource :', err);
      res.status(500).json({ message: 'Erreur serveur lors de l\'ajout de la ressource.' });
    }
  });

// Obtenir toutes les ressources d'une tâche
route.get('/tache/:taskId/ressources', async (req, res) => {
  try {
    const tacheId = req.params.taskId;
    const resources = await Resource.find({ tacheId });

    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des ressources', error });
  }
});

// Modifier une ressource
route.put('/ressources/:id', async (req, res) => {
  try {
    const { nom, type, quantite } = req.body;
    const resourceId = req.params.id;

    const updatedResource = await Resource.findByIdAndUpdate(
      resourceId,
      { nom, type, quantite },
      { new: true }
    );

    res.status(200).json(updatedResource);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la modification de la ressource', error });
  }
});

// Supprimer une ressource
route.delete('/:projectId/taches/:taskId', async (req, res) => {
    try {
      const taskId = req.params.taskId;
  
      // Supprimer la tâche
      const deletedTask = await Tache.findByIdAndDelete(taskId);
  
      if (!deletedTask) {
        return res.status(404).json({ message: 'Tâche non trouvée.' });
      }
  
      // Supprimer toutes les ressources associées à la tâche
      await Ressource.deleteMany({ tache: taskId });
  
      res.status(200).json({ message: 'Tâche et ressources associées supprimées avec succès.' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = route;