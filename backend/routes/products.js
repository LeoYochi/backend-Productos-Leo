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

// Consultar un producto por ID (opcional, útil para editar)
router.get("/:id", (req, res) => {
  Product.findById(req.params.id)
    .then(producto => {
      if (!producto) return res.status(404).json({ error: "Producto no encontrado" });
      res.json(producto);
    })
    .catch(err => res.status(500).json({ error: "Error al consultar producto", detalle: err.message }));
});

// Actualizar producto
router.put("/:id", (req, res) => {
  const { nombre, precio, cantidad, categoria } = req.body;
  Product.findByIdAndUpdate(
    req.params.id,
    { nombre, precio, cantidad, categoria },
    { new: true } // devuelve el producto actualizado
  )
    .then(producto => {
      if (!producto) return res.status(404).json({ error: "Producto no encontrado" });
      res.json(producto);
    })
    .catch(err => res.status(400).json({ error: "Error al actualizar producto", detalle: err.message }));
});

// Eliminar producto
router.delete("/:id", (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(producto => {
      if (!producto) return res.status(404).json({ error: "Producto no encontrado" });
      res.json({ mensaje: "Producto eliminado correctamente" });
    })
    .catch(err => res.status(500).json({ error: "Error al eliminar producto", detalle: err.message }));
});

module.exports = router;
