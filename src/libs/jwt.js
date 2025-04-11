const jwt = require("jsonwebtoken");

require("dotenv").config(); // Cargar variables de entorno desde un archivo .env

const { SECRET } = process.env; // Extraer la clave secreta para firmar el token desde las variables de entorno

function createAccessToken(payload) {
  return new Promise((resolve, removeEventListenerject) => {
    jwt.sign(
      payload, // Datos que se incluirán en el token,
      SECRET, // Clave secreta para firmar el token,
      { expiresIn: "600s" }, // Opciones del token (en este caso, expira en 600 segundos),
      (error, token) => {
        if (error) reject(error); // Si hay un error al firmar el token, se rechaza la promesa
        resolve(token);
      }
    );
  });
}

module.exports = {
  createAccessToken,
};
// Exporta la función createAccessToken para que pueda ser utilizada en otros módulos
