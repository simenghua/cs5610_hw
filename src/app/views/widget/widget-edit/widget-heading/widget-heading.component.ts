import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../../services/widget.service.client';
import {NgForm} from '@angular/forms';
import {SharedService} from '../../../../services/shared.service';

@Component({
  selector: 'app-widget-heading',
  templateUrl: './widget-heading.component.html',
  styleUrls: ['./widget-heading.component.css']
})
export class WidgetHeadingComponent implements OnInit {
  @ViewChild('f') widgetForm: NgForm;
  userId: String;
  pageId: String;
  wgid: String;
  widget = {type: 'Heading', name: ''};
  websiteId: String;
  errorFlag: Boolean;
  errorMsg: String;

  constructor(private widgetService: WidgetService, private activatedRoute: ActivatedRoute,
              private router: Router, private sharedService: SharedService) {
  }

  ngOnInit() {
    this.errorFlag = false;
    this.errorMsg = 'Enter the name of the widget';
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.wgid = params['wgid'];
          this.pageId = params['pid'];
          this.websiteId = params['wid'];
          this.userId = this.sharedService.user['_id'];
          if (this.wgid !== undefined) {
            return this.widgetService.findWidgetById(this.wgid).subscribe((returnWidget: any) => {
              this.widget = returnWidget;
            });
          } else {
           // this.widget.type = 'Heading';
          //  console.log(this.widget);
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
          //  console.log(this.widget);
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
