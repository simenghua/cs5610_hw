import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute} from '@angular/router';
import {Page} from '../../../models/page.model.client';

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit {

  @ViewChild('f') pageForm: NgForm;
  pageName: String;
  pageTitle: String;
  webID: String;
  constructor(private pageService: PageService, private activeRoute: ActivatedRoute) { }

  newPage() {
    this.pageName = this.pageForm.value.pageName;
    this.pageTitle = this.pageForm.value.pageTitle;
    const page = new Page(this.pageService.pages.length, this.pageName, this.webID, this.pageTitle);
    this.pageService.createPage(this.webID, page);
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(
      (params: any) => {
        this.webID = params['wid'];
      });
  }

}
