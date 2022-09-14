let Pantries = require('../models/pantries')
const extend = require('extend')
const Promise = require('bluebird')
const formidable = Promise.promisifyAll(require('formidable'))
const fs = require('fs')

const load = async (req, res, next, name) => {
  Pantries.findOne({"name" : name}).exec()
    .then(pantry => {
      if (pantry) {
        req.pantry = pantry

        next()
      } else {
        res.status(404).json('Not found')
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

// basic CRUD operations
const create = async (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true

  form.parseAsync(req)
    .then((fields, files) => {
      console.log(fields);
      let newPantry = new Pantries(fields);

      if (files) {
        console.log("files")
        path = files.pantryImg.path
        type = files.pantryImg.type
        newPantry.pantryImg.data = fs.readFileSync(path)
        newPantry.pantryImg.contentType = type
      }

      return newPantry.save()
    })
    .then(result => {
      res.status(201).json(result)
    })
    .catch(err => {
      res.status(400).json(err)
    })
}

const read = async (req, res) => {
  let response = {
    'pantry' : req.pantry,
    'posts' : req.posts
  }

  res.status(200).json(response)
}

const update = async (req, res) => {
  let pantry = req.pantry
  let form = new formidable.IncomingForm()
  form.keepExtensions = true

  form.parseAsync(req)
    .then((fields, files) => {
      console.log(fields);
      pantry = extend(pantry, fields);

      if (files) {
        path = files.pantryImg.path
        type = files.pantryImg.type
        pantry.pantryImg.data = fs.readFileSync(path)
        pantry.pantryImg.contentType = type
      }

      return pantry.save()
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
}

// const pantryImg = (req, res, next) => {
//   if(req.pantry.pantryImg.data){
//     res.set("Content-Type", req.pantry.pantryImg.contentType)
//     return res.send(req.pantry.pantryImg.data)
//   }
//   next()
// }

const remove = async (req, res) => {
  Pantries.deleteOne({"name" : req.pantry.name}).exec()
    .then(result => {
      if (result) {
        res.status(200).json('Deleted successfully')
      } else {
        res.status(404).json('Not found')
      }
    })
    .catch(err => {
      console.error(err)

      res.status(500).json(err)
    })
}

const dashboard = async (req, res) => {
  Pantries.find({}, 'name pantryBio location pantryImg contact hours').exec()
    .then(result => {
      if (result) {
        pantries = result.map(pantry => { return pantry })
        res.status(200).json({pantries})
      } else {
        res.status(404).json('Not found')
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

module.exports = {
  load,
  create,
  read,
  update,
  remove,
  dashboard
}
