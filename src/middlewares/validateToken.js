const jwt = require("jsonwebtoken");

require("dotenv").config(); // Cargar variables de entorno desde un archivo .env
const { SECRET } = process.env; // Extraer la clave secreta para firmar el token desde las variables de entorno

const authRequired = (req, res, next) => {
  try {
    const { token } = req.cookies; // Obtener el token de las cookies de la solicitud
    if (!token) {
      return res.status(401).json({ message: "No token provided" }); // Si no hay token, devolver un error 401
    }
    jwt.verify(token, SECRET, (error, user) => {
      if (error) {
        return res.status(401).json({ message: "Invalid token" }); // Si el token no es válido, devolver un error 401
      }
      req.user = user; // Si el token es válido, guardar la información decodificada en req.user
      next(); // Pasar al siguiente middleware o ruta
    });
  } catch (error) {
    console.error(error); // Registrar el error en la consola
    res.status(500).json({ message: "Internal server error" }); // Devolver un error 500 si ocurre un error inesperado
  }
};
module.exports = { authRequired };
