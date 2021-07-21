//jshint esversion:6
const mongoose = require('mongoose');

const itemSchema =new mongoose.Schema({
    name: String
});

const Item = mongoose.model('Item',itemSchema);
module.exports={itemSchema,Item};
