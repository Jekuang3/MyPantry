const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pantrySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  pantryImg: {
    // data: Buffer,
    // contentType: String
    type: String,
    trim: true
  },

  pantryBio: {
    type: String,
    trim: true
  },

  location: {
    type: String,
    default: 'Not Available',
    trim: true
  },

  contact: {
    type: String,
    trim: true
  },

  hours: {
    type: String,
    default: 'MWF 2:00 to 6:00 pm',
    trim: true
  },

  subscribers: [{
    type: Schema.ObjectId,
    ref: 'Users'
  }],

  members: [{
    type: Schema.ObjectId,
    ref: 'Users'
  }],

  owner: [{
    type: Schema.ObjectId,
    ref: 'Users'
  }],

  joinDate: {
    type: Date,
    default: Date.now
  }
})

// middleware
pantrySchema.pre('save', function(next) {
  this.lastUpdated = Date.now
  next()
})

pantrySchema.pre('deleteOne', function(next) {
  // delete posts
  // remove roles from users
  next()
})

module.exports = mongoose.model('Pantries', pantrySchema)
