const env = require('dotenv').config();
const jwt = require('jsonwebtoken');
const express_jwt = require('express-jwt');
const secret = process.env.JWT_SECRET;
const extend = require('extend')
let Users = require("../models/users");
let Pantries = require("../models/pantries");
const Promise = require('bluebird')
const formidable = Promise.promisifyAll(require('formidable'))
const fs = require('fs')

const load = async (req, res, next, name) => {
  Users.findOne({ name: name })
    .exec()
    .then((user) => {
      if (user) {
        req.user = user;
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
  let newUser = new Users(req.body);

  newUser
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

const read = async (req, res) => {
  user = req.user;
  user.password = undefined;
  res.status(200).json(req.user);
};

const update = async (req, res) => {
  let user = req.user
  let form = new formidable.IncomingForm()
  form.keepExtensions = true

  form.parseAsync(req)
    .then((fields, files) => {
      console.log(fields);
      user = extend(user, fields);

      if (files) {
        path = files.image.path
        type = files.image.type
        user.profilePicture.data = fs.readFileSync(path)
        user.profilePicture.type = type
      }

      return user.save()
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

const remove = async (req, res) => {
  Users.deleteOne({ name: req.user.name })
    .exec()
    .then((result) => {
      if (result) {
        res.status(200).json("Deleted successfully");
      } else {
        res.status(404).json("Not found");
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const logIn = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  Users.findOne({ email: email }, 'id name email password')
    .exec()
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "No account with that email address" });
      } else {
        req.user = user
        return user.checkForMatch(password);
      }
    })
    .then((result) => {
      if (result == true) {
        req.user.password = undefined

        let token = jwt.sign({ id: req.user.id }, secret);

        res.cookie('auth', token)
        res.status(200).json({ user: req.user, auth: token });
      } else {
        res.status(401).json({ message: "Incorrect password" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

const logOut = async (req, res) => {
  if (req.user && req.auth) {
    res.clearCookie('auth')
  }

  res.status(200).json({ message: "User log out successful"})
}

const validateUserAuth = async (req, res, next) => {
  try {
    let userID = req.user.id
    let authID = req.auth.id
  } catch (err) {
    return res.status(400).json({ message: 'Bad request'})
  }

  if (userID == authID) {
    next()
  } else {
    res.status(403).json({ message: 'Bad authentication credentials'})
  }
}

module.exports = {
  load,
  create,
  read,
  update,
  remove,
  logIn,
  logOut,
  validateUserAuth
};
