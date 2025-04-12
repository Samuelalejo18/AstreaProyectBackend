const usuario = require("../../models/user.js");
const bcrypt = require("bcrypt");
const { createAccessToken } = require("../../libs/jwt.js"); // Importar la función para crear el token
const register = async (req, res) => {
  const { nombre, apellido, email, password, fechaNacimiento } = req.body;
  try {
    /* Validar si el correo ya esta registrado */
    const usuarioEncontradoEmail = await usuario.findOne({ email });
    if (usuarioEncontradoEmail) {
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
    const token = await createAccessToken({ id: usuarioGuardado._id });
    res.cookie("token", token);
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

module.exports = { register };
