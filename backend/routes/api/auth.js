const express = require("express");
const {
  registration,
  login,
  getMe,
  updateData,
  updateCartItems,
} = require("../../controllers/api/AuthController");
// const { check } = require("express-validator");
const {
  registerValidation,
  loginValidation,
} = require("../../validations/auth.js");
const { checkAuth } = require("../../utils/checkAuth");

const router = express.Router();

router.post("/api/auth/registration", registerValidation, registration);
router.post("/api/auth/login", loginValidation, login);
router.post("/api/auth/user/update-cart-items", checkAuth, updateCartItems);
router.post("/api/auth/user/update", checkAuth, updateData);
router.get("/api/auth/me", checkAuth, getMe);

module.exports = router;
