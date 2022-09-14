const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema
//let Pantries = require('../pantries')
//let Posts = require('../posts')


const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  password: {
    type:String,
    required: true,
    trim: true
  },

  profilePicture: {
    data: Buffer,
    type: String
  },

  profileBio: {
    type: String,
    maxLength: 240,
    trim: true
  },

  subscribed: [{
    type: Schema.ObjectId,
    ref:'Pantries'
  }],

  memberOf: [{
    type: Schema.ObjectId,
    ref:'Pantries'
  }],

  owned: [{
    type: Schema.ObjectId,
    ref:'Pantries'
  }],

  joinDate: {
    type: Date,
    default: Date.now
  },

  lastUpdated: {
    type: Date,
    default: Date.now
  }
})

userSchema.pre('save', function(next) {
  let user = this
  user.lastUpdated = Date.now

  if (user.isModified('password') || user.isNew) {
    bcrypt.genSalt()
      .then(salt => {
        return bcrypt.hash(user.password, salt)
      })
      .then(encrypted => {
        user.password = encrypted
        next()
      })
      .catch(err => {
        console.error(err)
        return err
      })
  } else {
    next()
  }
})

userSchema.post('save', function(next) {
  let user = this
  this.password = undefined
})

userSchema.methods.checkForMatch = async function(userInput) {
  return bcrypt.compare(userInput, this.password)
           .then(result => {
             return result
           })
           .catch(err => {
             console.error(err)
             return err
           })
}

module.exports = mongoose.model('Users', userSchema)
