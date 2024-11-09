const express = require("express");
const router = express.Router();

// SOCKET-START
const { emit } = require("../lib/socket");
// SOCKET-END

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Home" });
});

// SOCKET-START
router.get("/5", (req, res, next) => {
  emit("slide", 5);
  res.send("Counter is now at 5");
});
// SOCKET-END

module.exports = router;
