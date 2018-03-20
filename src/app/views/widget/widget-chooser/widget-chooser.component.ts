import { Component, OnInit } from '@angular/core';
import {WidgetService} from '../../../services/widget.service.client';
import {ActivatedRoute} from '@angular/router';
import {Widget} from '../../../models/widget.model.client';

@Component({
  selector: 'app-widget-chooser',
  templateUrl: './widget-chooser.component.html',
  styleUrls: ['./widget-chooser.component.css']
})
export class WidgetChooserComponent implements OnInit {

  widgets: Widget[] = [];
  pageId: String;

  constructor(private activatedRoute: ActivatedRoute, private widgetService: WidgetService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        console.log(params['pid']);
        this.pageId = params['pid'];
      }
    );

    this.widgetService.findWidgetsByPageId(this.pageId).subscribe(
      (widgets: Widget[]) => {
        this.widgets = widgets;
      }
    );
  }
}

