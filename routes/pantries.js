const router = require("express").Router();
let users = require("../controllers/users");
let pantry = require("../controllers/pantries");
let posts = require("../controllers/posts");

var cors = require("cors");
router.use(cors());

router.route("/")
  .get(pantry.dashboard)
  .post(pantry.create);

router.param("name", pantry.load);
router.param("id", posts.load);

router.route("/:name/posts/:id")
  .get(posts.read)
  .put(posts.update)
  .delete(posts.remove);

router.route("/:name/posts")
  .get(posts.loadAll, pantry.read)
  .post(posts.create);

router.route("/:name")
  .get(posts.loadAll, pantry.read)
  .put(pantry.update)
  .delete(pantry.remove);

module.exports = router;
