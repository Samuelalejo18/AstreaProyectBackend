// Importa la librería Mongoose para interactuar con MongoDB
const mongoose = require("mongoose");
// Carga las variables de entorno desde un archivo .env
require("dotenv").config();

// Extrae la URI de conexión a MongoDB desde las variables de entorno
const { URI_MONGO } = process.env;

// Exporta una función que establece la conexión con MongoDB
module.exports = () => {
  mongoose
    .connect(
      //uri de mongo
      //process.env.URI_MONGO
      URI_MONGO
    ) // Intenta conectar a la base de datos con la URI proporcionada
    .catch((e) => console.log("Error de conexión con el servidor de mongo", e)); // Captura y muestra errores en la conexión
};
