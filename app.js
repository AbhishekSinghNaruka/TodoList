//jshint esversion:6
require('dotenv').config();
const express = require('express');
const bodyParser= require("body-parser");
const app= express();
const mongoose = require('mongoose');

app.set("view engine",'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const date = require(__dirname+"/date.js");
const {Item} = require("./models/item");
const defaultItems = require("./models/defaultItems.js");
const List = require("./models/List.js");
const {renderData,renderListData} = require("./controllers/get.js");
const pushData = require("./controllers/post.js");
const deleteItem = require("./controllers/delete.js");


mongoose.connect(process.env.URL,{useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);

//const Item = mongoose.model('Item',itemSchema);

app.get("/",renderData);

app.post("/",pushData);

app.post("/delete",deleteItem);


app.get("/:listName",renderListData);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}



app.listen(port,function(){
  console.log("server Started");
});
