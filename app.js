//jshint esversion:6
require('dotenv').config();
const express = require('express');
const bodyParser= require("body-parser");
const app= express();
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

app.set("view engine",'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

const date = require(__dirname+"/date.js");
const {Item} = require("./models/item");
const defaultItems = require("./models/defaultItems.js");
const {List} = require("./models/List.js");
const {renderData,renderListData} = require("./controllers/get.js");
const pushData = require("./controllers/post.js");
const deleteItem = require("./controllers/delete.js");
const {User} = require("./models/User.js");

mongoose.connect(process.env.URL,{useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);
mongoose.set("useCreateIndex",true);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/",renderData);

app.post("/",pushData);

app.post("/delete",deleteItem);

app.get("/login",function(req,res){
  res.render("login");
});

app.post("/login", passport.authenticate("local",{
    successRedirect: "/",
    failureRedirect: "/login",

}), function(req, res){

});

app.get("/register",function(req,res){
  res.render("register");
});

app.post("/register",function(req,res){

  User.register({email: req.body.email}, req.body.password, function(err,user){
    if(err)
    {
      console.log(err);
      res.redirect("/register");
    }
    else{
      passport.authenticate('local')(req,res,function(){
        User.findOne({email: req.body.email},function(err,result){
          if(err)
            console.log(err);
          else{
            if(!result)
              console.log("user not found");
            else{
                res.redirect("/");
            }
          }
        });

      });
    }
  });

});

app.get("/logout",function(req,res){
  req.logout();
  res.redirect("/");
});

//app.get("/:listName",renderListData);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


app.listen(port,function(){
  console.log("server Started");
});
