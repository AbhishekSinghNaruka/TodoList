//jshint esversion:6

const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const {itemSchema} = require("./item");
const {listSchema} = require("./List");


const userSchema = new mongoose.Schema ({
  email: {
  type: String,
  required: true,
  unique: true
},
  password: String,
  items: [itemSchema],
//  list: [listSchema]
});

userSchema.plugin(passportLocalMongoose,{usernameField:'email'});

const User = mongoose.model('User',userSchema);

module.exports={userSchema,User};
