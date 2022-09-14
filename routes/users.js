const router = require("express").Router();
let user = require("../controllers/users");

var cors = require("cors");
router.use(cors());

router.route("/create")
  .post(user.create);

router.route("/login")
  .post(user.logIn);

router.route("/logout")
  .get(user.logOut)

router.param("name", user.load);
router.route("/:name")
  .get(user.read)
  .put(user.update)
  .delete(user.remove);

module.exports = router;
