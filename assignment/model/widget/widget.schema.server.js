var mongoose = require("mongoose");

var WidgetSchema = mongoose.Schema ({
  _page: {
    type : mongoose.Schema.ObjectId,
    ref: "Page"
  },
  type: {
    type: String,
    enum: ['Heading', 'Image', 'YouTube', 'Html', 'Text']
  } ,
  name: {
    type : String
  },
  text: String,
  placeholder: String,
  description: String,
  url: String,
  width: String,
  height: Number,
  rows: Number,
  size: String,
  class: String,
  icon: String,
  deletable: Boolean,
  formatted: Boolean,
  position: Number,
  dateCreated: {
    type: Date,
    default: Date.now
  }
}, {collection: "widget" });

module.exports = WidgetSchema;
