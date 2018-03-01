import { Component, OnInit } from '@angular/core';
import {Page} from '../../../models/page.model.client';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent implements OnInit {
  userId: String;
  pages: Page[] = [];
  webID: String;
  constructor(private pageService: PageService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
        this.webID = params['wid'];
      });
    this.pages = this.pageService.findPageByWebsiteId(this.webID);
  }

}
