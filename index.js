const express = require("express");
const cors = require("cors");
require("dotenv").config();

const conectarMongo = require("./db/connection");
const Cazador = require("./models/cazador");

const app = express();
app.use(cors());
app.use(express.json());

conectarMongo();



app.post("/cazador", async (req, res) => {
  try {
    const { nombre } = req.body;

    if (!nombre) {
      return res.status(400).json({ error: "El nombre es obligatorio" });
    }

    const nuevoCazador = new Cazador({ nombre });
    await nuevoCazador.save();

    res.json({
      message: "Cazador guardado",
      cazador: nuevoCazador,
    });
  } catch (error) {
    console.error("Error guardando cazador:", error);
    res.status(500).json({ error: "Error guardando cazador" });
  }
});



app.put("/cazador/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { apellido } = req.body;

    if (!apellido) {
      return res.status(400).json({ error: "El apellido es obligatorio" });
    }

    const cazador = await Cazador.findByIdAndUpdate(
      id,
      { apellido },
      { new: true }
    );

    res.json(cazador);
  } catch (error) {
    console.error("Error actualizando cazador:", error);
    res.status(500).json({ error: "Error actualizando apellido" });
  }
});



app.get("/cazador/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const cazador = await Cazador.findById(id);

    res.json(cazador);
  } catch (error) {
    console.error("Error obteniendo cazador:", error);
    res.status(500).json({ error: "Error obteniendo cazador" });
  }
});


// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✓ Servidor corriendo en puerto ${PORT}`);
});
