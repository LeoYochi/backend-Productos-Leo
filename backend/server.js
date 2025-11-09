const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productsRouter = require("./routes/products");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error("Error conectando a MongoDB:", err.message));

app.use("/api/products", productsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`Servidor corriendo en puerto ${PORT}`));
