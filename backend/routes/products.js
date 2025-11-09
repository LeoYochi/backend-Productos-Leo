const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

// Crear producto
router.post("/", async (req, res) => {
  try {
    const { nombre, precio, cantidad, categoria } = req.body;
    const producto = await Product.create({ nombre, precio, cantidad, categoria });
    res.status(201).json(producto);
  } catch (err) {
    res.status(400).json({ error: "Error al crear producto", detalle: err.message });
  }
});

// Consultar todos los productos
router.get("/", async (req, res) => {
  try {
    const productos = await Product.find();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: "Error al consultar productos", detalle: err.message });
  }
});

// Consultar un producto por ID
router.get("/:id", async (req, res) => {
  try {
    const producto = await Product.findById(req.params.id);
    if (!producto) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(producto);
  } catch (err) {
    res.status(500).json({ error: "Error al consultar producto", detalle: err.message });
  }
});

// Actualizar producto
router.put("/:id", async (req, res) => {
  try {
    const { nombre, precio, cantidad, categoria } = req.body;
    const producto = await Product.findByIdAndUpdate(
      req.params.id,
      { nombre, precio, cantidad, categoria },
      { new: true } // devuelve el producto actualizado
    );
    if (!producto) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(producto);
  } catch (err) {
    res.status(400).json({ error: "Error al actualizar producto", detalle: err.message });
  }
});

// Eliminar producto
router.delete("/:id", async (req, res) => {
  try {
    const producto = await Product.findByIdAndDelete(req.params.id);
    if (!producto) return res.status(404).json({ error: "Producto no encontrado" });
    res.json({ mensaje: "Producto eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar producto", detalle: err.message });
  }
});

module.exports = router;
