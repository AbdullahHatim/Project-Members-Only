const express = require("express");
const router = express.Router();
const messagesController = require("../controllers/messages.controller");

function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/log-in");
}

router.get("/create-message", isAuth, messagesController.getCreateMessageForm);
router.post("/create-message", isAuth, messagesController.createMessage);

module.exports = router;
