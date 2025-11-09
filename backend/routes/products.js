const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

// Crear producto
router.post("/", (req, res) => {
  const { nombre, precio, cantidad, categoria } = req.body;
  Product.create({ nombre, precio, cantidad, categoria })
    .then(producto => res.status(201).json(producto))
    .catch(err => res.status(400).json({ error: "Error al crear producto", detalle: err.message }));
});

// Consultar todos los productos
router.get("/", (req, res) => {
  Product.find()
    .then(productos => res.json(productos))
    .catch(err => res.status(500).json({ error: "Error al consultar productos", detalle: err.message }));
});

module.exports = router;
