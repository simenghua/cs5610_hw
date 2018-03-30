var mongoose = require("mongoose");
var PageSchema = require("../page/page.schema.server");
var WebsiteSchema = mongoose.Schema ({
  _user: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  pages: [PageSchema],
  dateCreated: {
    type: Date,
    default: Date.now
  }
}, {collection: "website" });

module.exports = WebsiteSchema;
