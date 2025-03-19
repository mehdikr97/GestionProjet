const Joi = require("joi");

const validate = (data) => {
  const schema = Joi.object({
    nom: Joi.string().required().messages({
      "string.empty": "Le Nom est requis",
    }),
    description: Joi.string().required().messages({
      "string.empty": "La description est requise",
    }),
    dateDebut: Joi.date().required().messages({
      "date.base": "La date de début doit être une date valide",
    }),
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

module.exports = validate;
