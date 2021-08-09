//jshint esversion:6
const {Item} = require('../models/item.js');
const {List} = require("../models/List.js");
const {User} = require("../models/User.js");

function deleteItem(req,res){
  const itemId=req.body.checkBox;
  const listName=req.body.listName;

  User.findOneAndUpdate({_id:req.user._id},{$pull: {items:{_id:itemId}}},function(err,result){
    if(err)
      console.log(err);
    else
      res.redirect("/");
  });
}

module.exports = deleteItem;
