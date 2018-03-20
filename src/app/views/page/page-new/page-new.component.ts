import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {WebsiteService} from '../../../services/website.service.client';
import {Website} from '../../../models/website.model.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Page} from '../../../models/page.model.client';
import {PageService} from '../../../services/page.service.client';

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['../../../app.component.css']
})
export class PageNewComponent implements OnInit {

  @ViewChild('f') pageForm: NgForm;
  websiteId: String;
  name: String;
  title: String;
  userId: String;

  constructor(private pageService: PageService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        params => {
          this.userId = params['uid'];
          this.websiteId = params['wid'];
        }
      );
  }

  newPage() {
    const page = new Page('', '', this.websiteId, '');
    page.name = this.pageForm.value.name;
    page.title = this.pageForm.value.title;
    return this.pageService.createPage(this.websiteId, page).subscribe((returnPage: Page) => {});
  }

}
