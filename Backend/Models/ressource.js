const mongoose = require("mongoose")
const RessourceSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    type : { type :String , required:true},
    quantite :{type:Number ,required:true},
    tache: { type: mongoose.Schema.Types.ObjectId, ref: 'Tache', required: true }, 
} )
module.exports=mongoose.model("Ressource",RessourceSchema)