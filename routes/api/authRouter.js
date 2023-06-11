const express = require("express");
const { validateBody, authenticate, upload } = require("../../middlewares");
const {
  registerSchema,
  emailSchema,
  loginSchema,
  subscriptionSchema,
} = require("../../schemas/authSchema");
const {
  register,
  verify,
  resendVerifyEmail,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
} = require("../../controllers/authControllers");

const router = express.Router();

router.post("/register", validateBody(registerSchema), register);
router.get("/verify/:verificationCode", verify);
router.post("/verify", validateBody(emailSchema), resendVerifyEmail);
router.post("/login", validateBody(loginSchema), login);
router.get("/current", authenticate, getCurrent);
router.post("/logout", authenticate, logout);
router.patch(
  "/subscription",
  authenticate,
  validateBody(subscriptionSchema),
  updateSubscription
);
router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

module.exports = router;
