import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../../../environments/environment';
import {SharedService} from '../../../../services/shared.service';

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {

  @ViewChild('f') widgetForm: NgForm;
  pageId: String;
  widgetId: String;
  widget = {type: 'Image', name: ''};
  text: String;
  url: String;
  width: String;
  userId: String;
  websiteId: String;
  baseUrl = environment.baseUrl;
  errorMsg: String;
  errorFlag: Boolean;

  constructor(private widgetService: WidgetService, private activatedRoute: ActivatedRoute,
              private router: Router, private sharedService: SharedService) {
  }

  ngOnInit() {
    this.errorFlag = false;
    this.errorMsg = 'Enter the name of the widget';
    this.activatedRoute.params
      .subscribe(
        params => {
          this.websiteId = params['wid'];
          this.userId = this.sharedService.user['_id'];
          this.pageId = params['pid'];
          this.widgetId = params['wgid'];
          if (this.widgetId !== undefined) {
            return this.widgetService.findWidgetById(params['wgid']).subscribe((returnWidget: any) => {
              this.widget = returnWidget;
            });
          } else {
        //    console.log(this.widget);
          }
        }
      );
  }

  updateOrCreate() {
    console.log(this.widget.name);
    if (this.widget.name === '' || this.widget.name === undefined) {
      this.errorFlag = true;
    } else {
      if (this.widgetId !== undefined) {
        return this.widgetService.updateWidget(this.widgetId, this.widget).subscribe((returnWidget: any) => {
          this.router.navigate(['../'], {relativeTo: this.activatedRoute});
        });
      } else {
        return this.widgetService.createWidget(this.pageId, this.widget).subscribe((returnWidget: any) => {
          this.widget = returnWidget;
          this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
        });
      }
    }
  }

  delete() {
    if (this.widgetId !== undefined) {
      return this.widgetService.deleteWidget(this.widgetId).subscribe((returnWidget: any) => {
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      });
    } else {
      this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
    }
  }


}
