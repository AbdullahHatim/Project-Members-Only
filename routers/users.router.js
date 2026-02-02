const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const { body } = require("express-validator");
const passport = require("passport");
const usersModel = require("../models/users.model");

const validateUser = [
  body("first_name")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isAlpha()
    .withMessage("First name must only contain letters"),
  body("last_name")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isAlpha()
    .withMessage("Last name must only contain letters"),
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long")
    .custom(async (value) => {
      const user = await usersModel.getUserByUsername(value);
      if (user) {
        throw new Error("Username already in use");
      }
    }),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];

router.get("/sign-up", usersController.getSignUpForm);
router.post("/sign-up", validateUser, usersController.createUser);

router.get("/log-in", usersController.getLogInForm);
router.post("/log-in", usersController.logIn);

router.get("/log-out", usersController.logOut);

module.exports = router;
