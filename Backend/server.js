const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyparser=require("body-parser")
const route = require("./Controllers/projetRoute")



const app = express();

//Midlwears
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:3000"], credentials: true }));
app.use(express.json());


// Routes     

app.use("/api/projet",route)

mongoose.connect('mongodb://127.0.0.1:27017/GestionProjet')
  .then(() => console.log(" Connected to MongoDB"))
  .catch((err) => console.error(" Failed to connect to MongoDB:", err.message));

const PORT = process.env.PORT || 9090;
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});