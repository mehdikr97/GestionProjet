const express = require("express");
const Projet = require("../Models/projet");
const route = express.Router();
const validate = require("../validation/validationProjet");
const Tache = require("../Models/tache");
const Ressource = require("../Models/ressource");

// Ajouter un projet
route.post("/Ajouter", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const newProjet = new Projet({
      nom: req.body.nom,
      description: req.body.description,
      dateDebut: req.body.dateDebut,
      dateFin: req.body.dateFin,
      budget: req.body.budget,
    });

    await newProjet.save();
    res.status(201).json({ message: 'Projet ajouté avec succès' });
  } catch (error) {
    console.error("Erreur lors de l'ajout du Projet:", error);
    res.status(500).json({ error: error.message });
  }
});

// Afficher tous les projets
route.get("/Afficher", async (req, res) => {
  try {
    const projets = await Projet.find();
    res.status(200).json(projets);
  } catch (error) {
    console.error("Erreur de l'affichage", error);
    res.status(500).json({ error: error.message });
  }
});

// Supprimer un projet
route.delete("/Supprimer/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await Projet.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: 'Projet non trouvé.' });
    }

    const deletedTasks = await Tache.find({ projet: id });
    const taskIds = deletedTasks.map(task => task._id);

    await Tache.deleteMany({ projet: id });
    await Ressource.deleteMany({ tache: { $in: taskIds } });

    res.status(200).json({ message: "Projet, ses tâches et ressources supprimés avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    res.status(500).json({ error: error.message });
  }
});

// Modifier un projet
route.put("/Modifier/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const { id } = req.params;
    const updatedProjet = await Projet.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedProjet) {
      return res.status(404).json({ message: "Projet non trouvé" });
    }

    res.status(200).json({ message: "Projet modifié avec succès", updatedProjet });
  } catch (error) {
    console.error("Erreur lors de la modification du projet :", error);
    res.status(500).json({ error: error.message });
  }
});


module.exports = route;
