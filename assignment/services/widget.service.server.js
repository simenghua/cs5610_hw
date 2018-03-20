module.exports = function (app) {
  var multer = require('multer');
  var upload = multer({dest: __dirname + '/../../src/assets/uploads'});

  app.post("/api/page/:pageId/widget", createWidget);
  app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
  app.get("/api/widget/:widgetId", findWidgetById);
  app.put("/api/widget/:widgetId", updateWidget);
  app.delete("/api/widget/:widgetId", deleteWidget);
  app.put("/api/page/:pageId/widget", reorderWidgets);
  app.post("/api/upload", upload.single('myFile'), uploadImage);


  var widgets = [
    {_id: '123', widgetType: 'Heading', pageId: '321', size: '2', text: 'GIZMODO', width: '', url: ''},
    {_id: '234', widgetType: 'Text', pageId: '321', size: '', text: 'Lorem ipsum', width: '', url: '', rows: 3, formatted: true, placeholder: 'hello'},
    {_id: '345', widgetType: 'Image', pageId: '321', size: '', text: '', width: '100%', url: 'https://fm.cnbc.com/applications/cnbc.com/resources/img/editorial/2017/10/11/104766623-RTS1G3TN-trump.1910x1000.jpg'
    },
    {_id: '567', widgetType: 'Html', pageId: '321', size: '4', text: '<p>blabla</p>', width: '', url: ''},
    {_id: '678', widgetType: 'Youtube', pageId: '321', size: '', text: '', width: '100%', url: 'https://youtube.com/embed/kGeNMj3h8Sk'
    },
  ];

  function uploadImage(req, res) {
    var widgetId = req.body.widgetId;
    var width = req.body.width;
    var myFile = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname = myFile.originalname; // file name on user's computer
    var filename = myFile.filename;     // new file name in upload folder
    var path = myFile.path;         // full path of uploaded file
    var destination = myFile.destination;  // folder where file is saved to
    var size = myFile.size;
    var mimetype = myFile.mimetype;

    if (widgetId === '') {
      widgetId = '' + Math.round(Math.random() * 1000);
      const newWidget = {
        _id: '',
        widgetType: '',
        pageId: '',
        size: '',
        text: '',
        width: '',
        url: ''
      };
      newWidget.widgetType='Image';
      newWidget.pageId = pageId;
      newWidget.url = '/uploads/' + filename;
      newWidget._id = widgetId;
      newWidget.width = width;
      widgets.push(newWidget);
    } else {
      for (var x = 0; x < widgets.length; x++) {
        if (widgets[x]._id === widgetId) {
          widgets[x].url = '/uploads/' + filename;
        }
      }
    }
    res.redirect("https://cs5610-webdev-shua.herokuapp.com/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId)

  }

  function reorderWidgets(req, res) {
    var pageId = req.params.pageId;
    var startIndex = parseInt(req.query.start);
    var endIndex = parseInt(req.query.end);
    if (endIndex > startIndex) {
      var temp = widgets[startIndex];
      for (var i = startIndex; i < endIndex; i++) {
        widgets[i] = widgets[i + 1];
      }
      widgets[endIndex] = temp;
    } else {
      var temp = widgets[startIndex];
      for (var i = startIndex; i > endIndex; i--) {
        widgets[i] = widgets[i - 1];
      }
      widgets[endIndex] = temp;
    }
  }


  function createWidget(req, res) {
    var widget = req.body;
    var pageId = req.params["pageId"];
    widget._id = '' + Math.round(Math.random() * 1000);
    widget.pageId = pageId;
    widgets.push(widget);
    res.json(widget);
  }

  function findAllWidgetsForPage(req, res) {
    var pageId = req.params["pageId"];
    const targetList = [];
    for (var x = 0; x < widgets.length; x++) {
      if (widgets[x].pageId === pageId) {
        targetList.push(widgets[x]);
      }
    }
    res.json(targetList);
  }

  function findWidgetById(req, res) {
    var widgetId = req.params["widgetId"];
    for (var x = 0; x < widgets.length; x++) {
      if (widgets[x]._id === widgetId) {
        res.json(widgets[x]);
      }
    }
  }

  function updateWidget(req, res) {
    var widgetId = req.params["widgetId"];
    var widget = req.body;
    for (var i = 0; i < widgets.length; i++) {
      if (widgets[i]._id === widgetId) {
        widgets[i].size = widget.size;
        widgets[i].width = widget.width;
        widgets[i].text = widget.text;
        widgets[i].url = widget.url;
        widgets[i].formatted = widget.formatted;
        widgets[i].placeholder = widget.placeholder;
        widgets[i].rows = widget.rows;
        res.status(200).send(widgets[i]);
        return;
      }
    }
  }

  function deleteWidget(req, res) {
    var widgetId = req.params["widgetId"];
    for (var i = 0; i < widgets.length; i++) {
      if (widgets[i]._id === widgetId) {
        widgets.splice(i, 1);
      }
    }
  }
}
