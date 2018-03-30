var mongoose = require('mongoose');
var WebsiteSchema = require('./website.schema.server');
var WebsiteModel = mongoose.model('WebsiteModel', WebsiteSchema);

WebsiteModel.createWebsiteForUser = createWebsiteForUser;
WebsiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
WebsiteModel.findWebsiteById = findWebsiteById;
WebsiteModel.updateWebsite = updateWebsite;
WebsiteModel.deleteWebsite = deleteWebsite;

module.exports = WebsiteModel;

function createWebsiteForUser(userId, website) {
  website._user = userId;
  return WebsiteModel.create(website);
}

function findAllWebsitesForUser(userId) {
  return WebsiteModel.find({ _user: userId });
}

function findWebsiteById(websiteId) {
  return WebsiteModel.findById(websiteId);
}

function updateWebsite(websiteId, website) {
  return WebsiteModel.findByIdAndUpdate({_id: websiteId}, website);
}

function deleteWebsite(websiteId) {
  return WebsiteModel.findByIdAndRemove({_id: websiteId});
}
