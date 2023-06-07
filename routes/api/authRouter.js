const express = require("express");
const { validateBody } = require("../../middlewares");
const {
  registerSchema,
  loginSchema,
  subscriptionSchema,
} = require("../../schemas/authSchema");
const {register, login} = require("../../controllers/authControllers")

const router = express.Router();

router.post("/register", validateBody(registerSchema), register)
router.post("/login", validateBody(loginSchema), login)

module.exports = router;
