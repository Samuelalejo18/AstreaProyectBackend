const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body); // Validar el cuerpo de la solicitud con el esquema proporcionado
    next(); // Si la validación es exitosa, continuar al siguiente middleware o ruta
  } catch (error) {
    if (error && Array.isArray(error.errors)) {
      return res.status(400).json({
        errors: error.errors.map((e) => e.message),
      });
    } else {
      console.error("Error en el validador:", error);
      return res.status(500).json({
        error: "Error interno en la validación de datos",
      });
    }
  }
};
