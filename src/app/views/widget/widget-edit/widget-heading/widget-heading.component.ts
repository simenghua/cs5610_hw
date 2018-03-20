import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../../services/widget.service.client';
import {Widget} from '../../../../models/widget.model.client';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-widget-heading',
  templateUrl: './widget-heading.component.html',
  styleUrls: ['../../../../app.component.css']
})
export class WidgetHeadingComponent implements OnInit {
  @ViewChild('f') widgetForm: NgForm;
  pageId: String;
  wgid: String;
  widget: Widget;
  text: String;
  size: String;


  constructor(private widgetService: WidgetService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.wgid = params['wgid'];
          this.pageId = params['pid'];
          if (this.wgid !== undefined) {
            return this.widgetService.findWidgetById(this.wgid).subscribe((returnWidget: Widget) => {
              this.widget = returnWidget;
              this.text = this.widget.text;
              this.size = this.widget.size;
            });
          } else {
            this.widget = new Widget('', 'Heading', '', '', '', '', '');
            this.text = this.widget.text;
            this.size = this.widget.size;
          }
        }
      );

  }


  updateOrCreate() {
    this.widget.text = this.widgetForm.value.text;
    this.widget.size = this.widgetForm.value.size;
    this.widget.widgetType = 'Heading';
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
