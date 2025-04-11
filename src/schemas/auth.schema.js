const { z } = require("zod");

const registerSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  apellido: z.string().min(1, "El apellido es obligatorio"),
  email: z.string().email("Correo electrónico no válido"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
    .regex(/[a-z]/, "Debe contener al menos una letra minúscula")
    .regex(/[0-9]/, "Debe contener al menos un número")
    .regex(/[^A-Za-z0-9]/, "Debe contener al menos un carácter especial")
    .max(14, "La contraseña no puede ser mayor a 14 caracteres"),
  fechaNacimiento: z.coerce.date({
    required_error: "La fecha de nacimiento es obligatoria",
    invalid_type_error: "Debe ser una fecha válida (YYYY-MM-DD)",
  }),
});

const loginSchema = z.object({
  email: z.string().email("Correo electrónico no válido"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
    .regex(/[a-z]/, "Debe contener al menos una letra minúscula")
    .regex(/[0-9]/, "Debe contener al menos un número")
    .regex(/[^A-Za-z0-9]/, "Debe contener al menos un carácter especial")
    .max(14, "La contraseña no puede ser mayor a 14 caracteres"),
});

module.exports = { registerSchema, loginSchema };
