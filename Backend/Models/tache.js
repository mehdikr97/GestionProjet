const mongoose = require("mongoose")
const TacheSchema = new mongoose.Schema({
    description : { type :String , required:true},
    dateDebut : { type:Date , required:true},
    dateFin : { type:Date , required:true},
} )
module.exports=mongoose.model("Tache",TacheSchema)