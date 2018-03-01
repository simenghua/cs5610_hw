import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../../services/widget.service.client';
import {NgForm} from '@angular/forms';
import {Widget} from '../../../../models/widget.model.client';

@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {
  @ViewChild('f') headerForm: NgForm;
  pageId: String;
  wgid: String;
  widget: Widget;
  text: String;
  size: String;
  widgetType: String;
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
    if (this.headerForm.value.headerText !== '' || this.headerForm.value.headerSize !== '') {
      this.widget.text = this.headerForm.value.headerText;
      this.widget.size = this.headerForm.value.headerSize;
    } else if (this.wgid !== undefined) {
      this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      return;
    } else {
      this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
      return;
    }
    this.widget.widgetType = 'HEADER';
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
      this.size = this.widget.size;
      this.widgetType = this.widget.widgetType;
    });
  }

}
