const mongoose = require("mongoose");

const CazadorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String },
  timestamp: { type: Date, default: Date.now },
});


const Cazador =
  mongoose.models.Cazador ||
  mongoose.model("Cazador", CazadorSchema, "cazadores");

module.exports = Cazador;
