const usersModel = require("../models/users.model");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const passport = require("passport");

async function getSignUpForm(req, res) {
  res.render("sign-up", { title: "Sign Up", errors: [] });
}

async function getLogInForm(req, res) {
  res.render("log-in", { title: "Log In", errors: [] });
}

async function createUser(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("sign-up", {
      title: "Sign Up",
      errors: errors.array(),
      ...req.body,
    });
  }

  const { first_name, last_name, username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await usersModel.createUser(first_name, last_name, username, hashedPassword);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
}

function logIn(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.render("log-in", {
        title: "Log In",
        errors: [{ msg: info.message || "Incorrect username or password" }],
        username: req.body.username,
      });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/");
    });
  })(req, res, next);
}

function logOut(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}

async function getJoinClubForm(req, res) {
  res.render("join-club", { title: "Join the Club", errors: [] });
}

async function joinClub(req, res, next) {
  const { passcode } = req.body;
  if (passcode === process.env.CLUB_SECRET) {
    try {
      await usersModel.updateMembershipStatus(req.user.id, "member");
      res.redirect("/");
    } catch (err) {
      return next(err);
    }
  } else {
    res.render("join-club", {
      title: "Join the Club",
      errors: [{ msg: "Incorrect passcode" }],
    });
  }
}

module.exports = {
  getSignUpForm,
  getLogInForm,
  createUser,
  logIn,
  logOut,
  getJoinClubForm,
  joinClub,
};
