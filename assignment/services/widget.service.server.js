module.exports = function (app) {
  var widgetModel = require("../model/widget/widget.model.server");

  var multer = require('multer');
  var upload = multer({dest: __dirname + '/../../src/assets/uploads'});

//  var baseUrl = "http://localhost:3100"; // for local
  var baseUrl = "https://cs5610-webdev-shua.herokuapp.com"; // for development

  app.post("/api/page/:pageId/widget", createWidget);
  app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
  app.get("/api/widget/:widgetId", findWidgetById);
  app.put("/api/widget/:widgetId", updateWidget);
  app.delete("/api/widget/:widgetId", deleteWidget);
  app.put("/api/page/:pageId/widget", reorderWidgets);

  app.post("/api/upload", upload.single('myFile'), uploadImage);



  // var widgets = [
  //   {_id: '123', widgetType: 'Heading', pageId: '321', size: '2', text: 'GIZMODO', width: '', url: ''},
  //   {_id: '234', widgetType: 'Text', pageId: '321', size: '', text: 'Lorem ipsum', width: '', url: '', rows: 3, formatted: true, placeholder: 'hello'},
  //   {_id: '345', widgetType: 'Image', pageId: '321', size: '', text: '', width: '100%', url: 'https://fm.cnbc.com/applications/cnbc.com/resources/img/editorial/2017/10/11/104766623-RTS1G3TN-trump.1910x1000.jpg'
  //   },
  //   {_id: '567', widgetType: 'Html', pageId: '321', size: '4', text: '<p>blabla</p>', width: '', url: ''},
  //   {_id: '678', widgetType: 'Youtube', pageId: '321', size: '', text: '', width: '100%', url: 'https://youtube.com/embed/kGeNMj3h8Sk'
  //   },
  // ];



  function uploadImage(req, res) {
    var widgetId = req.body.widgetId;
    var width = req.body.width;
    var myFile = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    if (myFile == null) {
      res.redirect(baseUrl + "/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
      return;
    }

    var originalname = myFile.originalname; // file name on user's computer
    var filename = myFile.filename;     // new file name in upload folder
    var path = myFile.path;         // full path of uploaded file
    var destination = myFile.destination;  // folder where file is saved to
    var size = myFile.size;
    var mimetype = myFile.mimetype;

    if (widgetId === '') {
      const newWidget = {
        _id: '',
        type: '',
        pageId: '',
        size: '',
        text: '',
        width: '',
        url: ''
      };
      newWidget.type='Image';
      newWidget.pageId = pageId;
      newWidget.url = '/uploads/' + filename;
      newWidget._id = widgetId;
      newWidget.width = width;
      widgetModel.findAllWidgetsForPage(pageId).then(function (widgets) {
        newWidget.position = widgets.length;
        widgetModel.createWidget(pageId, newWidget).then(function (widget) {
          this.widgetId = widget._id;
        });
      });
    } else {
      var imageUrl = '/uploads/' + filename;
      var widget = {url: imageUrl};
      widgetModel.updateWidget(widgetId, widget).then(function (stats) {
            res.send(200);
          });
    }

    res.redirect(baseUrl + "/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId)



  }

  function reorderWidgets(req, res) {
    var pageId = req.params["pageId"];
    var startIndex = parseInt(req.query.start);
    var endIndex = parseInt(req.query.end);

    widgetModel.reorderWidgets(pageId, startIndex, endIndex).then(
      function (stats) {
        res.sendStatus(200);
      },
      function (err) {
        res.sendStatus(400).send("hello 1");
      });
  }


  function createWidget(req, res) {
    var widget = req.body;
    var pageId = req.params["pageId"];
    widgetModel.findAllWidgetsForPage(pageId).then(function (widgets) {
      widget.position = widgets.length;
      widgetModel.createWidget(pageId, widget).then(function (widget) {
        res.json(widget);
      });
    });
    // widgetModel.createWidget(pageId, widget).then(
    //   function (widget) {
    //     if (widget) {
    //       res.json(widget);
    //     } else {
    //       res.sendStatus(400).send('0');
    //     }
    //   }
    // );
  }

  function findAllWidgetsForPage(req, res) {
    var pageId = req.params["pageId"];
    widgetModel.findAllWidgetsForPage(pageId).then(
      function (widget) {
        res.json(widget);
      },
      function (err) {
        res.sendStatus(400).send(err);
      }
    );
  }

  function findWidgetById(req, res) {
    var widgetId = req.params["widgetId"];
    widgetModel.findWidgetById(widgetId).then(
      function (widget) {
          res.json(widget);
      },
      function (err) {
          res.sendStatus(404).send(err);
      });
  }

  function updateWidget(req, res) {
    var widgetId = req.params["widgetId"];
    var widget = req.body;
    widgetModel.updateWidget(widgetId, widget).then(
      function (stats) {
          res.json(stats);
      },
      function (err) {
          res.sendStatus(404).send(err);
      });
  }

  function deleteWidget(req, res) {
    var widgetId = req.params["widgetId"];
    widgetModel.deleteWidget(widgetId).then(
      function (stats) {
        res.json(stats);
      },
      function (err) {
        res.sendStatus(404).send(err);
      }
    );
  }
}


