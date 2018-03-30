module.exports = function (app) {
  app.post("/api/user/:userId/website", createWebsite);
  app.get("/api/user/:userId/website", findAllWebsitesForUser);
  app.get("/api/website/:websiteId", findWebsiteById);
  app.put("/api/website/:websiteId", updateWebsite);
  app.delete("/api/website/:websiteId", deleteWebsite);

  var websiteModel = require("../model/website/website.model.server");

  // var websites = [
  //   {_id: '123', name: 'facebook', developerId: '456', description: 'Lorem'},
  //   {_id: '234', name: 'Twitter', developerId: '456', description: 'Lorem'},
  //   {_id: '456', name: 'Gizmodo', developerId: '456', description: 'Lorem'},
  //   {_id: '890', name: 'Go', developerId: '123', description: 'Lorem'},
  //   {_id: '567', name: 'Tic Tac Toe', developerId: '123', description: 'Lorem'},
  //   {_id: '678', name: 'Checkers', developerId: '123', description: 'Lorem'},
  // ];

  function createWebsite(req, res) {
    var website = req.body;
    console.log(website);
    var userId = req.params["userId"];
    websiteModel.createWebsiteForUser(userId, website).then(
      function (website) {
        if (website) {
          res.json(website);
        } else {
          res.error.send('0');
        }
      },
      function (err) {
        res.sendStatus(400).send(err);
      }
    );
  }

  function findAllWebsitesForUser(req, res) {
    var userId = req.params["userId"];
    websiteModel.findAllWebsitesForUser(userId).then(
      function (website) {
        res.json(website);
      },
      function (err) {
        res.sendStatus(400).send(err);
      }
    );
  }

  function findWebsiteById(req, res) {
    var websiteId = req.params["websiteId"];
    websiteModel.findWebsiteById(websiteId).then(
      function (website) {
        if (website) {
          res.json(website);
        } else {
          res.error.send('0');
        }
      },
      function (err) {
        res.sendStatus(400).send(err);
      }
    );
  }

  function updateWebsite(req, res) {
    var websiteId = req.params["websiteId"];
    var website = req.body;
    websiteModel.updateWebsite(websiteId, website).then(
      function (website) {
        if (website) {
          res.json(website);
        } else {
          res.error.send('0');
        }
      },
      function (err) {
        res.sendStatus(400).send(err);
      }
    );
  }

  function deleteWebsite(req, res) {
    var websiteId = req.params["websiteId"];
    websiteModel.deleteWebsite(websiteId).then(
      function (website) {
        res.json(website);
      },
      function (err) {
        res.sendStatus(400).send(err);
      }
    );
  }
}

