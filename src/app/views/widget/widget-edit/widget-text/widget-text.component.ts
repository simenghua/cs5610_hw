import {Component, OnInit, ViewChild} from '@angular/core';
import {WidgetService} from '../../../../services/widget.service.client';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../../../services/shared.service';

@Component({
  selector: 'app-widget-text',
  templateUrl: './widget-text.component.html',
  styleUrls: ['./widget-text.component.css']
})
export class WidgetTextComponent implements OnInit {
  @ViewChild('f') widgetForm: NgForm;
  userId: String;
  pageId: String;
  wgid: String;
  widget = {type: 'Text', name: ''};
  text: String;
  rows: Number;
  formatted: Boolean;
  placeholder: String;
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
          this.wgid = params['wgid'];
          this.pageId = params['pid'];
          this.userId = this.sharedService.user['_id'];
          if (this.wgid !== undefined) {
            return this.widgetService.findWidgetById(this.wgid).subscribe((returnWidget: any) => {
              this.widget = returnWidget;
            });
          } else {
        //    console.log(this.widget);
          }
        }
      );
  }


  updateOrCreate() {
    if (this.widget.name === '') {
      this.errorFlag = true;
    } else {
      if (this.wgid !== undefined) {
        return this.widgetService.updateWidget(this.wgid, this.widget).subscribe((returnWidget: any) => {
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
    if (this.wgid !== undefined) {
      return this.widgetService.deleteWidget(this.wgid).subscribe((returnWidget: any) => {
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      });
    } else {
      this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
    }
  }

}
