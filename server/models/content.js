const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var contentSchema = new Schema({
    name : String,
    age : Number,
    gender : String,
    company : String,
    email : String,
    phone : String,
    address : String
})

contentSchema.index({ name : 1, email : 1,'$**': 'text'});

var Content = mongoose.model('Content', contentSchema);

module.exports = Content;
