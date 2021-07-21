//jshint esversion:6
const mongoose = require('mongoose');
const {Item} = require("./item.js");

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

module.exports = defaultItems;
