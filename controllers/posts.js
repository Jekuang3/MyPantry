let Users = require("../models/users");
let Pantries = require("../models/pantries");
let Posts = require("../models/posts");
var extend = require("extend");
const load = async (req, res, next, id) => {
  Posts.findById(id)
    .exec()
    .then((post) => {
      if (post) {
        req.post = post;
        next();
      } else {
        res.status(404).json("Not found");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

// basic CRUD operations
const create = async (req, res) => {
  console.log("Create Post");
  console.log(req.body.body);
  let newPost = new Posts({
    pantry: req.pantry.id,
    author: req.body.author, // will be req.user.id w/ auth implemented
    body: req.body.body,
  });
  console.log(newPost);
  newPost
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const read = async (req, res) => {
  if (req.post) {
    res.status(200).json(req.post);
  } else if (req.pantry.posts) {
    res.status(200).json(req.pantry.posts);
  } else {
    res.status(404).json("Not found");
  }
};

const update = async (req, res) => {
  let post = req.post;
  post = extend(post, req.body);

  post
    .save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json(err);
    });
};

const remove = async (req, res) => {
  console.log(req.post);
  Posts.deleteOne({ _id: req.post._id })
    .exec()
    .then((result) => {
      console.log(result)
      if (result.deletedCount > 0) {
        res.status(200).json("Deleted successfully");
      } else {
        res.status(404).json("Not found");
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const loadAll = async (req, res, next) => {
  Posts.find({ pantry: req.pantry.id })
    .populate({
      path: "author",
      select: "name", //'name profilePicture'
    })
    .exec()
    .then((posts) => {
      req.posts = posts.map((post) => {
        let id = post.id;
        let user = post.author.name;
        let body = post.body;
        let date = post.date;

        item = {
          id: id,
          user: user,
          body: body,
          date: date,
        };
        /*
        // placeholder until image feature is implemented
        if (post.author.profilePicture) {
          item['userPic'] = post.author.profilePicture.data
        }
        */

        return item;
      });

      next();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

module.exports = {
  load,
  create,
  read,
  update,
  remove,
  loadAll,
};
