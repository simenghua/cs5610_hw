module.exports = function(app){
  app.post("/api/website/:websiteId/page", createPage);
  app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
  app.get("/api/page/:pageId", findPageById);
  app.put("/api/page/:pageId", updatePage);
  app.delete("/api/page/:pageId", deletePage);

  var pageModel = require("../model/page/page.model.server");

  // var pages = [
  //   {_id:'321', name: 'page1', websiteId: '456', title: 'Lorem'},
  //   {_id:'123', name: 'page2', websiteId: '456', title: 'Lorem'},
  //   {_id:'234', name: 'page3', websiteId: '456', title: 'Lorem'},
  // ];

  function createPage(req, res) {
    var page = req.body;
    var websiteId = req.params.websiteId;
    pageModel.createPage(websiteId, page).then(
      function (page) {
        if (page) {
          res.json(page);
        } else {
          res.error.send('0');
        }
      },
      function (err) {
        res.sendStatus(400).send(err);
      }
    );
  }


  function findAllPagesForWebsite(req, res) {
    var websiteId = req.params["websiteId"];
    pageModel.findAllPagesForWebsite(websiteId).then(
      function (page) {
        res.json(page);
      },
      function (err) {
        res.error.send('0');
      }
    );
  }

  function findPageById(req, res) {
    var pageId = req.params["pageId"];
    pageModel.findPageById(pageId).then(
      function (page) {
        if (page) {
          res.json(page);
        } else {
          res.sendStatus(400).send('0');
        }
      },
      function (err) {
        res.sendStatus(400).send(err);
      }
    );
  }

  function updatePage(req, res) {
    var pageId = req.params["pageId"];
    var page  = req.body;
    pageModel.updatePage(pageId, page).then(
      function (page) {
        if (page) {
          res.json(page);
        } else {
          res.sendStatus(400).send('0');
        }
      },
      function (err) {
        res.sendStatus(400).send(err);
      }
    );
  }

  function deletePage(req, res) {
    var pageId = req.params["pageId"];
    pageModel.deletePage(pageId).then(
      function (page) {
        res.json(page);
      },
      function (err) {
        res.sendStatus(400).send(err);
      }
    );
  }
}
