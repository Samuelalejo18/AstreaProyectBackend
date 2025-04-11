const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    nombre: { type: String, unique: false, required: true },
    apellido: { type: String, unique: false, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, unique: false, required: true },
    fechaNacimiento: { type: Date, require: true, unique: false },
  },
  {
    timestamps: true,
  } /* la opción { timestamps: true } en un esquema agrega automáticamente dos campos a cada documento de la colección:

  createdAt: Almacena la fecha y hora en que se creó el documento.
  updatedAt: Se actualiza automáticamente cada vez que se modifica el documento. */
);

const usuario = mongoose.model("usuario", usersSchema);

module.exports = usuario;
