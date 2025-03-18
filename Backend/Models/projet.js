const mongoose = require('mongoose');
const Joi =require('joi')
const projetSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: { type: String, required: true },
  dateDebut: { type: Date, required: true },
  dateFin: { type: Date, required: true },
  budget: { type: Number, required: true }
});

// Schéma de validation avec Joi
const validate = (data) => {
  const schema = Joi.object({
    nom: Joi.string().required().messages(
     "Le Nom est requis"
    ),
    description: Joi.string().required().messages(
     "La description est requise"
    ),
    dateDebut: Joi.date().required().messages(
      "La date de début doit être une date valide"
    ),
    dateFin: Joi.date().required().greater(Joi.ref('dateDebut')).messages({
      "date.base": "La date de fin doit être une date valide",
      "any.required": "La date de fin est requise",
      "date.greater": "La date de fin doit être après la date de début",
    }),
    budget: Joi.number().positive().required().messages({
      "number.base": "Le budget doit être un nombre",
      "number.positive": "Le budget doit être positif",
      "any.required": "Le budget est requis",
    }),
  });

  return schema.validate(data, { abortEarly: false }); 
};

const Projet = mongoose.model('Projet', projetSchema);


module.exports = Projet ,validate ;
