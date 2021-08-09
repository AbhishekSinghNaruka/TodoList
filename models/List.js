//jshint esversion:6
const mongoose = require('mongoose');
const {itemSchema} = require("./item");

const listSchema = new mongoose.Schema({
    name: String,
    items: [itemSchema]
});

const List = mongoose.model("List",listSchema);
module.exports = {List,listSchema};
