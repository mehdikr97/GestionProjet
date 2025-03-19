const mongoose = require('mongoose');

const TacheSchema = new mongoose.Schema({
  description: { type: String, required: true },
  dateDebut: { type: Date, required: true },
  dateFin: { type: Date, required: true },
  projet: { type: mongoose.Schema.Types.ObjectId, ref: 'Projet', required: true }, 
  ressources: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ressource" }], // Référence aux ressources

})
;

module.exports = mongoose.model('Tache', TacheSchema);