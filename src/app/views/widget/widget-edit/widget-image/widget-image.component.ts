import {Component, OnInit, ViewChild} from '@angular/core';
import {Widget} from '../../../../models/widget.model.client';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../../services/widget.service.client';

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {

  @ViewChild('f') imageForm: NgForm;
  pageId: String;
  wgid: String;
  widget: Widget;
  text: String;
  url: String;
  width: String;
  constructor(private activatedRoute: ActivatedRoute, private widgetService: WidgetService, private router: Router) { }

  delete() {
    if (this.wgid !== undefined) {
      this.widgetService.deleteWidget(this.wgid);
      this.router.navigate(['../'], {relativeTo: this.activatedRoute});
    } else {
      this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
    }
  }

  updateOrCreate() {
    this.widget.text = this.imageForm.value.imageText;
    if (this.imageForm.value.imageUrl !== '') {
      this.widget.url = this.imageForm.value.imageUrl;
    } else if (this.wgid !== undefined) {
      this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      return;
    } else {
      this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
      return;
    }
    this.widget.width = this.imageForm.value.imageWidth;
    this.widget.widgetType = 'IMAGE';
    if (this.wgid !== undefined) {
      this.widgetService.updateWidget(this.wgid, this.widget);
      this.router.navigate(['../'], {relativeTo: this.activatedRoute});
    } else {
      this.widgetService.createWidget(this.pageId, this.widget);
      this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
    }
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.pageId = params['pid'];
      this.wgid = params['wgid'];
      if (params['wgid'] !== undefined) {
        this.widget = this.widgetService.findWidgetById(this.wgid);
      } else {
        this.widget = new Widget('', '', '', '', '', '', '');
      }
      this.text = this.widget.text;
      this.url = this.widget.url;
      this.width = this.widget.width;
    });
  }

}
