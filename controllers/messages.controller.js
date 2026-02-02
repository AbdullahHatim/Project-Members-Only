const messagesModel = require("../models/messages.model");
const { body, validationResult } = require("express-validator");

async function getCreateMessageForm(req, res) {
  res.render("create-message", { title: "Create Message", user: req.user });
}

const createMessage = [
  body("title").trim().isLength({ min: 1 }).withMessage("Title is required"),
  body("content").trim().isLength({ min: 1 }).withMessage("Content is required"),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("create-message", {
        title: "Create Message",
        user: req.user,
        errors: errors.array(),
      });
    }

    try {
      await messagesModel.createMessage(
        req.body.title,
        req.body.content,
        req.user.id
      );
      res.redirect("/");
    } catch (err) {
      return next(err);
    }
  },
];

async function getAllMessages(req, res, next) {
  try {
    const messages = await messagesModel.getAllMessages();
    res.render("index", { title: "Members Only", user: req.user, messages: messages });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getCreateMessageForm,
  createMessage,
  getAllMessages,
};
