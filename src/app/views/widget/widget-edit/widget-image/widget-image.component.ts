import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Widget} from '../../../../models/widget.model.client';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['../../../../app.component.css']
})
export class WidgetImageComponent implements OnInit {

  @ViewChild('f') widgetForm: NgForm;
  pageId: String;
  widgetId: String;
  widget: Widget;
  text: String;
  imageUrl: String;
  width: String;
  userId: String;
  websiteId: String;
  baseUrl = environment.baseUrl;

  constructor(private widgetService: WidgetService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        params => {
          this.websiteId = params['wid'];
          this.userId = params['uid'];
          this.pageId = params['pid'];
          this.widgetId = params['wgid'];
          if (this.widgetId !== undefined) {
            return this.widgetService.findWidgetById(params['wgid']).subscribe((returnWidget: Widget) => {
              this.widget = returnWidget;
              this.text = this.widget.text;
              this.imageUrl = this.widget.url;
              this.width = this.widget.width;
            });
          } else {
            this.widget = new Widget('', '', '', '', '', '', '');
            this.text = this.widget.text;
            this.imageUrl = this.widget.url;
            this.width = this.widget.width;
          }
        }
      );
  }


  updateOrCreate() {
    if (this.widgetId !== undefined) {
      this.widget.text = this.widgetForm.value.imageText;
      this.widget.width = this.widgetForm.value.imageWidth;
      this.widget.url = this.widgetForm.value.imageUrl;
      return this.widgetService.updateWidget(this.widgetId, this.widget).subscribe((returnWidget: Widget) => {
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      });
    } else {
      this.widget.text = this.widgetForm.value.imageText;
      this.widget.width = this.widgetForm.value.imageWidth;
      this.widget.url = this.widgetForm.value.imageUrl;
      this.widget.widgetType = 'Image';
      return this.widgetService.createWidget(this.pageId, this.widget).subscribe((returnWidget: Widget) => {
        this.widget = returnWidget;
        this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
      });
    }
  }

  delete() {
    if (this.widgetId !== undefined) {
      return this.widgetService.deleteWidget(this.widgetId).subscribe((returnWidget: Widget) => {
      });
    } else {
      this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
    }
  }

}
