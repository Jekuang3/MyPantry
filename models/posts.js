const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },

  pantry:  {
    type: Schema.Types.ObjectId,
    ref: 'Pantries'
  },

  body: {
    type: String,
    required: true,
    trim: true
  },

  date: {
    type: Date,
    default: Date.now
  }
})

// presorts posts by pantry, followed by post in descending order
postSchema.index({ "pantry": 1, "date": -1})

postSchema.pre("save", function(next) {
  let post = this
  next()
})

module.exports = mongoose.model('Posts', postSchema)
