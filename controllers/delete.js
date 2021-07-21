//jshint esversion:6
const {Item} = require('../models/item.js');
const List = require("../models/List.js");

function deleteItem(req,res){
  const itemId=req.body.checkBox;
  const listName=req.body.listName;

    if(listName=="Today"){
    Item.findByIdAndRemove(itemId,function(err){
      if(err)
        console.log(err);
      else
        console.log("Succesfully deleted item");
      res.redirect("/");
    });
  }
  else{
      List.findOneAndUpdate({name:listName},{$pull: {items:{_id:itemId}}},function(err, result){
        if(!err)
          res.redirect("/"+listName);
      });
  }
}

module.exports = deleteItem;
