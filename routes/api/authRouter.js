const express = require("express");
const { validateBody } = require("../../middlewares");
const {
  registerSchema,
  loginSchema,
  subscriptionSchema,
} = require("../../schemas/authSchema");
const {register} = require("../../controllers/authControllers")

const router = express.Router();

router.post("/register", validateBody(registerSchema), register)

module.exports = router;
