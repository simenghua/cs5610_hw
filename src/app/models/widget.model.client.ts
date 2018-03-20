export class Widget {
  _id: String;
  widgetType: String;
  pageId: String;
  size: String;
  text: String;
  width: String;
  url: String;
  rows: number;
  placeholder: String;
  formatted: boolean;

  constructor(_id, widgetType, pageId, size, text, width, url, rows = 1, placeholder = 'place', formatted = false) {
    this._id = _id;
    this.widgetType = widgetType;
    this.size = size;
    this.pageId = pageId;
    this.url = url;
    this.width = width;
    this.text = text;
    this.rows = rows;
    this.placeholder = placeholder;
    this.formatted = formatted;
  }
}
