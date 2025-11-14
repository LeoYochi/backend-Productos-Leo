// framework para crear el servidor.
const express = require("express");

// conecta con MongoDB.
const mongoose = require("mongoose");

// permitir que el frontend acceda al backend.
const cors = require("cors");

// archivo de rutas CRUD de productos.
const productsRouter = require("./routes/products");

const app = express();
app.use(cors());
app.use(express.json());

// Conecta a MongoDB usando la variable de entorno
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error("Error conectando a MongoDB:", err.message));

  // Monta el router de productos en la ruta
app.use("/api/products", productsRouter);

// Define el puerto
const PORT = process.env.PORT || 5000;

// arranca el servidor y escucha peticiones.
app.listen(PORT, "0.0.0.0", () => console.log(`Servidor corriendo en puerto ${PORT}`));

