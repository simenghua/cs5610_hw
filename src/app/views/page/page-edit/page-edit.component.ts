import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PageService} from '../../../services/page.service.client';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {

  @ViewChild('f') pageForm: NgForm;
  pageId: String;
  page = {_id: undefined, name: '', title: ''};
  websiteId: String;
  errorFlag: Boolean;
  errorMsg: String;
  constructor(private pageService: PageService, private activatedRoute: ActivatedRoute, private router: Router) { }

  update() {
    if (this.page.name === '') {
      this.errorFlag = true;
    } else {
      this.pageService.updatePage(this.pageId, this.page)
        .subscribe(
          (data: any) => this.router.navigate(['../'], {relativeTo: this.activatedRoute}),
          (error: any) => console.log(error)
        );
    }
  }

  delete() {
    return this.pageService.deletePage(this.pageId).subscribe(
      (data: any) => this.router.navigate(['../'], {relativeTo: this.activatedRoute}),
      (error: any) => console.log(error)
    );
  }
  ngOnInit() {
    this.errorFlag = false;
    this.errorMsg = 'Enter the name of the page';
    this.activatedRoute.params.subscribe(params => {
      this.websiteId = params['wid'];
      this.pageId = params['pid'];
    });
    this.pageService.findPageById(this.pageId).subscribe((data: any) => {
        this.page = data;
      }
    );
  }

}
