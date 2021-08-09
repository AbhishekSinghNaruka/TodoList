//jshint esversion:6
const {Item} = require("../models/item.js");
const {List} = require("../models/List.js");
const defaultItems = require("../models/defaultItems.js");
const _ = require("lodash");
const {User} = require("../models/User.js");
const date = require("../date.js");

function renderData(req,res){
  if(req.isAuthenticated())
    {
      //console.log(req.user);
      User.findById(req.user._id,function(err,userFound){
        if(err)
          console.log(err);
        else{
          if(userFound){
              if(!userFound.items.length){
                  userFound.items=defaultItems;
                  userFound.save();
                    res.render("list",{Header:date.getDate() , items:defaultItems} );
              }
              else
                res.render("list",{Header:date.getDate() , items:userFound.items} );
          }
        }
      });
    }
  else
    res.redirect("/login");
}

function renderListData(req,res){
  const listName = _.capitalize(req.params.listName);
  if(listName!= "favicon.ico" && listName!=""){
    User.findById(req.user._id,function(err,userFound){
      userFound.List.founOne({name:listName},function(err, results){
        if(err)
          console.log(err);
        else{
          if(!results){
            const list = new List({
              name: listName,
              items: defaultItems
            });
            userFound.List.push(list);
            userFound.save();
            res.render("list",{Header:listName , items:defaultItems});
          }
          else{
            res.render("list",{Header:listName , items:results.items});
          }
        }
      });
    });
  }
}

module.exports = {renderData,renderListData};
