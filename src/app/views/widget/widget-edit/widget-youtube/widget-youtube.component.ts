import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Widget} from '../../../../models/widget.model.client';

@Component({
  selector: 'app-widget-youtube',
  templateUrl: './widget-youtube.component.html',
  styleUrls: ['./widget-youtube.component.css']
})
export class WidgetYoutubeComponent implements OnInit {

  @ViewChild('f') widgetForm: NgForm;
  pageId: String;
  wgid: String;
  widget: Widget;
  text: String;
  url: String;
  width: String;

  constructor(private widgetService: WidgetService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        params => {
          this.wgid = params['wgid'];
          this.pageId = params['pid'];
        }
      );
    if (this.wgid !== undefined) {
      return this.widgetService.findWidgetById(this.wgid).subscribe((returnWidget: Widget) => {
        this.widget = returnWidget;
        this.text = this.widget.text;
        this.url = this.widget.url;
        this.width = this.widget.width;
      });
    } else {
      this.widget = new Widget('', '', '', '', '', '', '');
    }
    this.text = this.widget.text;
    this.url = this.widget.url;
    this.width = this.widget.width;
  }


  updateOrCreate() {
    this.widget.text = this.widgetForm.value.youtubeText;
    this.widget.width = this.widgetForm.value.youtubeWidth;
    this.widget.url = this.widgetForm.value.youtubeUrl;
    this.widget.widgetType = 'Youtube';
    if (this.wgid !== undefined) {
      return this.widgetService.updateWidget(this.wgid, this.widget).subscribe((returnWidget: Widget) => {
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      });
    } else {
      return this.widgetService.createWidget(this.pageId, this.widget).subscribe((returnWidget: Widget) => {
        this.widget = returnWidget;
        this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
      });
    }
  }

  delete() {
    if (this.wgid !== undefined) {
      return this.widgetService.deleteWidget(this.wgid).subscribe((returnWidget: Widget) => {
      });
    } else {
      this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
    }
  }

}
