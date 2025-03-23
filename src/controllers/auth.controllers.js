const usuario = require("../models/user.js");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { nombre, apellido, email, password, fechaNacimiento } = req.body;
  try {
    /* Validar si el correo ya esta registrado */
    const userFoundEmail = await usuario.findOne({ email });
    if (userFoundEmail) {
      return res.status(400).json([" ❌ El correo ya esta registrado"]);
    }

    //incriptar la password

    const passwordHash = await bcrypt.hash(password, 10);

    const nuevoUsuario = new usuario({
      nombre,
      apellido,
      email,
      password: passwordHash,
      fechaNacimiento,
    });

    const usuarioGuardado = await nuevoUsuario.save();
    res.json({
      id: usuarioGuardado._id,
      nombre: usuarioGuardado.nombre,
      apellido: usuarioGuardado.apellido,
      email: usuarioGuardado.email,
      fechaNacimiento: usuarioGuardado.fechaNacimiento,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

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

    res.json({
      id: usuarioEncontrado._id,
      nombre: usuarioEncontrado.nombre,
      apellido: usuarioEncontrado.apellido,
      email: usuarioEncontrado.email,
      fechaNacimiento: usuarioEncontrado.fechaNacimiento,
    });

    res.json({});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };
