//jshint esversion:6

const express = require('express');
const bodyParser= require("body-parser");
const app= express();
const date = require(__dirname+"/date.js");
const mongoose = require('mongoose');
const _ = require("lodash");
app.set("view engine",'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


let workItems=[];

mongoose.connect("mongodb+srv://user-admin:GxfKVAjgWU4EVdp@cluster0.nu7zw.mongodb.net/todolistDB",{useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);
const itemScema ={
    name: String
};

const Item = mongoose.model('Item',itemScema);

const item1 = new Item({
  name: "Welcome to your Todo list"
});

const item2 = new Item({
  name: "Hit + button to add a new item"
});

const item3 = new Item({
  name: "<-- Hit this button to delete an item"
});

const defaultItems = [item1, item2, item3];

const listSchema = {
    name: String,
    items: [itemScema]
};

const List = mongoose.model("List",listSchema);

app.get("/",function(req,res){

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

});

app.post("/",function(req,res){

  const itemName=req.body.newListItem;
  const listName=req.body.list;

  const item = new Item({
    name: itemName
  });
  //console.log(listName);
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
});

app.post("/delete",function(req,res){
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
});


app.get("/:listName",function(req,res){
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
});

app.listen(3000,function(){
  console.log("server is now listening on port 3000");
});
