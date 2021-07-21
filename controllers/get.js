//jshint esversion:6
const {Item} = require("../models/item.js");
const List = require("../models/List.js");
const defaultItems = require("../models/defaultItems.js");
const _ = require("lodash");



function renderData(req,res){
Item.find({},function(err, itemsFound){
    if(itemsFound.length===0){
      Item.insertMany(defaultItems,function(err){
        if(err)
          console.log(err);
        else
          console.log("Sucessfully inserted deafult item to database");
      });
        res.render("list",{Header:"Today" , items:defaultItems} );   //date.getDate()
    }
    else{
        res.render("list",{Header:"Today" , items:itemsFound} );    //date.getDate()
    }
  });
}

function renderListData(req,res){
  const listName = _.capitalize(req.params.listName);
  if(listName!= "favicon.ico" && listName!=""){
    List.findOne({name:listName},function(err, results){
        if(err)
          console.log(err);
        else{
          if(!results){
            const list = new List({
              name: listName,
              items: defaultItems
            });
            list.save();
            res.render("list",{Header:listName , items:defaultItems});
          }
          else{
            res.render("list",{Header:listName , items:results.items});
          }
        }
    });
  }
}

module.exports = {renderData,renderListData};
