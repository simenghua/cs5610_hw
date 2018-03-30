var mongoose = require ("mongoose");
var WidgetSchema = require("./widget.schema.server");
var WidgetModel =  mongoose.model("WidgetModel", WidgetSchema);

WidgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
WidgetModel.updateWidget = updateWidget;
WidgetModel.createWidget = createWidget;
WidgetModel.findWidgetById = findWidgetById;
WidgetModel.deleteWidget = deleteWidget;
WidgetModel.reorderWidgets = reorderWidgets;
WidgetModel.updatePosition = updatePosition;
WidgetModel.resetWidgets = resetWidgets;

module.exports = WidgetModel;

function updatePosition(pageId, position) {
  return WidgetModel.find({_page:pageId}, function (err, widgets) {
    widgets.forEach (function (widget) {
      if(widget.position > position){
        widget.position--;
        widget.save();
      }
    })
  })
}

function reorderWidgets(pageId, startIndex, endIndex) {
  return WidgetModel.find({_page:pageId}, function (err, widgets) {
    widgets.forEach (function (widget) {
      if(startIndex < endIndex){
        if(widget.position === startIndex){
          widget.position = endIndex;
          widget.save();
        }else if (widget.position > startIndex
          && widget.position <= endIndex){
          widget.position --;
          widget.save();
        }else {
          if(widget.position === startIndex){
            widget.position = endIndex;
            widget.save();
          } else if(widget.position < startIndex
            && widget.position >= endIndex){
            widget.position ++;
            widget.save();
          }
        }
      }
      if (startIndex > endIndex) {
        if (widget.position === startIndex) {
          widget.position = endIndex;
          widget.save();
        } else if (widget.position < startIndex
          && widget.position >= endIndex) {
          widget.position++;
          widget.save();
        } else {
          if (widget.position === startIndex) {
            widget.position = endIndex;
            widget.save();
          } else if (widget.position > startIndex
            && widget.position <= endIndex) {
            widget.position--;
            widget.save();
          }
        }
      }
    })
  })
}

function findAllWidgetsForPage(pageId) {
  return WidgetModel.find({_page: pageId});
}

function updateWidget(widgetId, widget) {
  delete widget._id;
  return WidgetModel
    .update({_id: widgetId}, {
      $set: widget
    })
}

function createWidget(pageId, widget)  {
  widget._id = mongoose.Types.ObjectId();
  widget._page = pageId;
  return WidgetModel.create(widget);
}

function findWidgetById(widgetId) {
  return WidgetModel.findById (widgetId);
}

function deleteWidget(widgetId) {
  WidgetModel.findById(widgetId, function (err, foundWidget) {
    var index = foundWidget.position;
    resetWidgets(index, foundWidget._page);
  });
  return WidgetModel.remove({_id: widgetId});
}

function resetWidgets(index, pageId) {
  WidgetModel.find({ _page: pageId }, function (err, widgets) {
    widgets.forEach(function (widget) {
      if (widget.position > index) {
        widget.position--;
        widget.save();
      }
    })
  })
}
