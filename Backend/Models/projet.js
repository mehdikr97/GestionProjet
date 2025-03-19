const mongoose = require('mongoose');
const Joi = require('joi');

const projetSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: { type: String, required: true },
  dateDebut: { type: Date, required: true },
  dateFin: { type: Date, required: true },
  budget: { type: Number, required: true }
});

const Projet = mongoose.model('Projet', projetSchema);

module.exports = Projet;
