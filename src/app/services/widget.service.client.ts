import {Injectable} from '@angular/core';
import {Widget} from '../models/widget.model.client';

@Injectable()
export class WidgetService {

  // constructor(_id:String, type:String, pageId:String, size= '1', text = 'text', url = 'url', width = '100%')
  widgets: Widget[] = [
    new Widget('123', 'HEADER', '333', '2', 'GIZMODO'),
    new Widget('234', 'HEADER', '333', '2', 'GIZMODO'),
    new Widget('345', 'IMAGE', '333', '2', 'text', '100%', 'http://lorempixel.com/400/200/'),
    new Widget('455', 'HTML', '333', '2', '<p>blalbla</p>'),
    new Widget('567', 'YOUTUBE', '333', '2', 'text', '100%', 'https://youtube.com/embed/kGeNMj3h8Sk'),
  ];

  createWidget(pageId, widget) {
    widget._id = (new Date()).getTime() + '';
    widget.pageId = pageId;
    this.widgets.push(widget);
  }

  findWidgetsByPageId(pageId) {
    const resultSet = [];
    for (const i in this.widgets) {
      if (this.widgets[i].pageId === pageId) {
        resultSet.push(this.widgets[i]);
      }
    }
    return resultSet;
  }

  findWidgetById(widgetId) {
    return this.widgets.find(function (widget) {
      return widget._id === widgetId;
    });
  }

  updateWidget(widgetId, widget) {
    for (const i in this.widgets) {
      if (this.widgets[i]._id === widgetId) {
        switch (widget.widgetType) {
          case 'HEADER':
            this.widgets[i].text = widget.text;
            this.widgets[i].size = widget.size;
            return true;

          case 'IMAGE':
            this.widgets[i].text = widget.text;
            this.widgets[i].url = widget.url;
            this.widgets[i].width = widget.width;
            return true;

          case 'YOUTUBE':
            this.widgets[i].text = widget.text;
            this.widgets[i].url = widget.url;
            this.widgets[i].width = widget.width;
            return true;
        }

      }
    }
    return false;
  }

  deleteWidget(widgetId) {
    for (const i in this.widgets) {
      if (this.widgets[i]._id === widgetId) {
        const j = +i;
        this.widgets.splice(j, 1);
      }
    }
  }
}
