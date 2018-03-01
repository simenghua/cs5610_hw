import {Component, OnInit, ViewChild} from '@angular/core';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute} from '@angular/router';
import {Page} from '../../../models/page.model.client';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {
  @ViewChild('f') editForm: NgForm;
  pageID: String;
  page: Page;
  userId: String;
  pageName: String;
  pageTitle: String;
  constructor(private pageService: PageService, private activatedRoute: ActivatedRoute) { }

  updatePage() {
    if (this.editForm.value.pageName !== '') {
      this.page.name = this.editForm.value.pageName;
    }
    if (this.editForm.value.pageTitle !== '') {
      this.page.title = this.editForm.value.pageTitle;
    }
    this.pageService.updatePage(this.pageID, this.page);
  }

  deletePage() {
    this.pageService.deletePage(this.page._id);
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.userId = params['uid'];
      this.pageID = params['pid'];
    });
    this.page = this.pageService.findPageById(this.pageID);
  }
}
