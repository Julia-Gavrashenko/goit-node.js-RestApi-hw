const express = require("express");
const { validateBody, authenticate} = require("../../middlewares");
const {
  registerSchema,
  loginSchema,
  subscriptionSchema,
} = require("../../schemas/authSchema");
const {register, login, getCurrent} = require("../../controllers/authControllers")

const router = express.Router();

router.post("/register", validateBody(registerSchema), register)
router.post("/login", validateBody(loginSchema), login)
router.get("/current", authenticate, getCurrent)

module.exports = router;
