import {Component, OnInit, ViewChild} from '@angular/core';
import {Widget} from '../../../../models/widget.model.client';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../../services/widget.service.client';

@Component({
  selector: 'app-widget-youtube',
  templateUrl: './widget-youtube.component.html',
  styleUrls: ['./widget-youtube.component.css']
})
export class WidgetYoutubeComponent implements OnInit {

  @ViewChild('f') youtubeForm: NgForm;
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
    this.widget.text = this.youtubeForm.value.youtubeText;
    this.widget.size = this.youtubeForm.value.youtubeSize;
    if (this.youtubeForm.value.youtubeUrl !== '') {
      this.widget.url = this.youtubeForm.value.youtubeUrl;
    } else if (this.wgid !== undefined) {
      this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      return;
    } else {
      this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
      return;
    }
    this.widget.widgetType = 'YOUTUBE';
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
