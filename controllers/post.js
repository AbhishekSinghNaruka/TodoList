// jshint esversion:6
const {Item} = require('../models/item.js');
const List = require("../models/List.js");

function pushData(req, res){
  const itemName=req.body.newListItem;
  const listName=req.body.list;

  const item = new Item({
    name: itemName
  });
  if(listName == "Today"){
    item.save();

    res.redirect("/");
  }
  else{
    List.findOne({name: listName}, function(err,result){
      result.items.push(item);
      result.save();
      res.redirect("/"+listName);
    });
  }
}

module.exports = pushData;
