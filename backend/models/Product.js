//Define cómo debe lucir un producto en tu base de datos.

//Importa la librería Mongoose para definir esquemas y modelos.
const mongoose = require("mongoose");

//Crea y define la estructura de cada producto en MongoDB.
const productSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  precio: { type: Number, required: true, min: 0 },
  cantidad: { type: Number, required: true, min: 0 },
  categoria: { type: String, required: true, trim: true }
}, { timestamps: true });

//Crea el modelo Product basado en el esquema.
module.exports = mongoose.model("Product", productSchema);
