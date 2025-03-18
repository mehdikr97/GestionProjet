const mongoose = require("mongoose")
const RessourceSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    description : { type :String , required:true},
    dateDebut : { type:Date , required:true},
    dateFin : { type:Date , required:true},
    budget :{type:Number ,required:true}
} )
module.exports=mongoose.model("Ressource",RessourceSchema)