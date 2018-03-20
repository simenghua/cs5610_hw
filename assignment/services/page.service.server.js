module.exports = function(app){
  app.post("/api/website/:websiteId/page", createPage);
  app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
  app.get("/api/page/:pageId", findPageById);
  app.put("/api/page/:pageId", updatePage);
  app.delete("/api/page/:pageId", deletePage);

  var pages = [
    {_id:'321', name: 'page1', websiteId: '456', title: 'Lorem'},
    {_id:'123', name: 'page2', websiteId: '456', title: 'Lorem'},
    {_id:'234', name: 'page3', websiteId: '456', title: 'Lorem'},
  ];

  function createPage(req, res) {
    var page = req.body;
    page._id = '' + Math.round(Math.random() * 1000);
    pages.push(page);
    res.json(page);
  }


  function findAllPagesForWebsite(req, res) {
    var websiteId = req.params["websiteId"];
    const targetList = [];
    for (var x = 0; x < pages.length; x++) {
      if (pages[x].websiteId === websiteId) {
        targetList.push(pages[x]);
      }
    }
    res.json(targetList);
  }

  function findPageById(req, res) {
    var pageId = req.params["pageId"];
    for (var x = 0; x < pages.length; x++) {
      if (pages[x]._id === pageId) {
        res.json(pages[x]);
      }
    }
  }

  function updatePage(req, res) {
    var pageId = req.params["pageId"];
    var page  = req.body;
    for(var i = 0; i < pages.length; i++){
      if(pages[i]._id === pageId){
        pages[i].name = page.name;
        pages[i].title = page.title;
        res.status(200).send(pages[i]);
        return;
      }
    }
  }

  function deletePage(req, res) {
    var pageId = req.params["pageId"];
    for (var i = 0; i < pages.length; i++) {
      if (pages[i]._id === pageId) {
        pages.splice(i, 1);
      }
    }
  }
}
