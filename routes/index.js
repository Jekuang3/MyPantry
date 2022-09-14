const express = require("express");
const router = express.Router();
const cors = require("cors");
router.use(cors());

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("home");
});

router.get("/register_pantry", function (req, res) {
  res.render("register_pantry");
});

router.get("/test", function (req, res) {
  res.json({ msg: "it works!!" });
});

module.exports = router;
