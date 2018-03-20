module.exports = function (app) {
  app.post("/api/user/:userId/website", createWebsite);
  app.get("/api/user/:userId/website", findAllWebsitesForUser);
  app.get("/api/website/:websiteId", findWebsiteById);
  app.put("/api/website/:websiteId", updateWebsite);
  app.delete("/api/website/:websiteId", deleteWebsite);

  var websites = [
    {_id: '123', name: 'facebook', developerId: '456', description: 'Lorem'},
    {_id: '234', name: 'Twitter', developerId: '456', description: 'Lorem'},
    {_id: '456', name: 'Gizmodo', developerId: '456', description: 'Lorem'},
    {_id: '890', name: 'Go', developerId: '123', description: 'Lorem'},
    {_id: '567', name: 'Tic Tac Toe', developerId: '123', description: 'Lorem'},
    {_id: '678', name: 'Checkers', developerId: '123', description: 'Lorem'},
  ];

  function createWebsite(req, res) {
    var website = req.body;
    var userId = req.params["userId"];
    website._id = '' + Math.round(Math.random() * 1000);
    website.developerId = userId;
    websites.push(website);
    res.json(website);
  }

  function findAllWebsitesForUser(req, res) {
    var userId = req.params["userId"];
    const targetList = [];
    for (var x = 0; x < websites.length; x++) {
      if (websites[x].developerId === userId) {
        targetList.push(websites[x]);
      }
    }
    res.json(targetList);
  }

  function findWebsiteById(req, res) {
    var websiteId = req.params["websiteId"];
    for (var x = 0; x < websites.length; x++) {
      if (websites[x]._id === websiteId) {
        res.json(websites[x]);
      }
    }
  }

  function updateWebsite(req, res) {
    var websiteId = req.params["websiteId"];
    var website = req.body;
    for (var i = 0; i < websites.length; i++) {
      if (websites[i]._id === websiteId) {
        websites[i].name = website.name;
        websites[i].description = website.description;
        res.status(200).send(websites[i]);
        return;
      }
    }
  }

  function deleteWebsite(req, res) {
    var websiteId = req.params["websiteId"];
    for (var i = 0; i < websites.length; i++) {
      if (websites[i]._id === websiteId) {
        websites.splice(i, 1);
      }
    }
  }
}
