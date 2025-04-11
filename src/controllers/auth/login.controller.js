const usuario = require("../../models/user.js");
const bcrypt = require("bcrypt");
//Importar la libreria de jsonwebtoken

const jwt = require("jsonwebtoken");
require("dotenv").config(); // Cargar variables de entorno desde un archivo .env
// Extraer la clave secreta para firmar el token desde las variables de entorno
const { SECRET } = process.env;

const { createAccessToken } = require("../../libs/jwt.js"); // Importar la función para crear el token

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // buscar el usuario existe por correo
    const usuarioEncontrado = await usuario.findOne({ email });

    if (!usuarioEncontrado) {
      return res.status(400).json({
        message: ["❌ El correo no esta registrado "],
      });
    }

    //comparar contraseña encriptada

    const matchedPassword = await bcrypt.compare(
      password,
      usuarioEncontrado.password
    );

    if (!matchedPassword) {
      return res.status(400).json({
        message: [" ❌ Contraseña incorrecta"],
      });
    }

    // Crear token
    const token = await createAccessToken({ id: usuarioEncontrado._id });
    res.cookie("token", token);
    res.json({
      id: usuarioEncontrado._id,
      nombre: usuarioEncontrado.nombre,
      apellido: usuarioEncontrado.apellido,
      email: usuarioEncontrado.email,
      fechaNacimiento: usuarioEncontrado.fechaNacimiento,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Deslogearse o cerrar el token

const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) }); // Eliminar la cookie del token
  return res.status(200).json({
    message: "Logout exitoso",
  });
};

//mirar el perfil

const profile = async (req, res) => {
  const usuarioEncontrado = await usuario
    .findById(req.user.id)
    .select("-password");

  if (!usuarioEncontrado) {
    return res.status(400).json({
      message: ["❌ El usuario no existe"],
    });
  }

  res.json({
    id: usuarioEncontrado._id,
    nombre: usuarioEncontrado.nombre,
    apellido: usuarioEncontrado.apellido,
    email: usuarioEncontrado.email,
    fechaNacimiento: usuarioEncontrado.fechaNacimiento,
  });
};

const verifyToken = async (req, res) => {
  const { token } = req.cookies; // Obtener el token de las cookies de la solicitud
  if (!token) {
    return res.status(401).json({ message: "No token provided" }); // Si no hay token, devolver un error 401
  }

  jwt.verify(token, SECRET, async (error, user) => {
    if (error) {
      return res.status(401).json({ message: "No autorizado" }); // Si el token no es válido, devolver un error 401
    }

    const userEncontrado = await usuario.findById(user.id).select("-password");
    if (!userEncontrado) {
      return res.status(400).json({
        message: ["❌No autorizado"],
      });
    }

    res.json({
      id: usuarioEncontrado._id,
      nombre: usuarioEncontrado.nombre,
      apellido: usuarioEncontrado.apellido,
      email: usuarioEncontrado.email,
      fechaNacimiento: usuarioEncontrado.fechaNacimiento,
    });
  });
};

module.exports = { login, logout, profile, verifyToken };
