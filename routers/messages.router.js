const express = require("express");
const router = express.Router();
const messagesController = require("../controllers/messages.controller");

function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/log-in");
}

function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.membership_status === "admin") {
    return next();
  }
  const err = new Error("Unauthorized");
  err.status = 403;
  return next(err);
}

router.get("/create-message", isAuth, messagesController.getCreateMessageForm);
router.post("/create-message", isAuth, messagesController.createMessage);
router.post("/delete", isAdmin, messagesController.deleteMessage);

module.exports = router;
