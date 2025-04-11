const { Router } = require("express");

const router = Router();

const authRequired = require("../middlewares/validateToken.js");
const { register } = require("../controllers/auth/register.controller.js");
const {
  login,
  logout,
  verifyToken,
  profile,
} = require("../controllers/auth/login.controller.js");

const validateSchema = require("../middlewares/validator.middleware.js");
const { registerSchema, loginSchema } = require("../schemas/auth.schema.js");

router.post("/register", validateSchema(registerSchema), register);
router.post("./login", validateSchema(loginSchema), login);
router.post("./logout", logout);
router.get("/verifyToken", verifyToken); // Verifica el token
router.get("/profile", authRequired, profile);
module.exports = router;
