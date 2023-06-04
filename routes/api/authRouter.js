const express = require("express");
const { validateBody } = require("../../middlewares");
const {
  registerSchema,
  loginSchema,
  subscriptionSchema,
} = require("../../schemas/authSchema");

const router = express.Router();

router.post("/register", validateBody(registerSchema), )

module.exports = router;
