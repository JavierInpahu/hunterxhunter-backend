const express = require("express");
const router = express.Router();
const Cazador = require("../models/cazador");

router.post("/cazador", async (req, res) => {
  try {
    const { nombre, apellido } = req.body;

    const nuevoCazador = new Cazador({
      nombre,
      apellido,
      timestamp: new Date(),
    });

    await nuevoCazador.save();

    res.json({
      mensaje: "Cazador guardado correctamente",
      cazador: nuevoCazador,
    });

  } catch (error) {
    console.error("Error guardando cazador:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

module.exports = router;
