// jshint esversion:6
const {Item} = require('../models/item.js');
const {List} = require("../models/List.js");
const {User} = require("../models/User.js");

function pushData(req, res){
  const itemName=req.body.newListItem;
  const listName=req.body.list;
  const item = new Item({
    name: itemName
  });

  User.findById(req.user._id,function(err,userFound){
    if(err)
      console.log(err);
    else{
      if(userFound){
          userFound.items.push(item);
          userFound.save();
          res.redirect("/");
      }
    }
  });
}

module.exports = pushData;
