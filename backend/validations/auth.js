const { body } = require("express-validator");

const registerValidation = [
  body("username", "Min 2 symbols").isLength({ min: 2 }),
  body("password", "Min 6 symbols").isLength({ min: 6 }),
];

const loginValidation = [
  body("username", "Min 2 symbols").isLength({ min: 2 }),
  body("password", "Min 6 symbols").isLength({ min: 6 }),
];

module.exports = {
  registerValidation,
  loginValidation,
};
