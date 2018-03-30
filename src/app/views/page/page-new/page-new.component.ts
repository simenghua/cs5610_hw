import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute, Router} from '@angular/router';
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
  errFlag: Boolean;
  error: String;
  page = {_id: undefined, name: '', title: ''};

  constructor(private pageService: PageService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.errFlag = false;
    this.error = 'Enter the name of the page';
    this.activatedRoute.params
      .subscribe(
        params => {
          this.userId = params['uid'];
          this.websiteId = params['wid'];
        }
      );
  }

  newPage() {
    if (this.page.name === '') {
      this.errFlag = true;
    } else {
      this.pageService.createPage(this.websiteId, this.page)
        .subscribe(
          (data: any) => {
            this.page = data;
           this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page']);
           }
        );
    }
    // const page = new Page('', '', this.websiteId, '');
    // page.name = this.pageForm.value.name;
    // page.title = this.pageForm.value.title;
    // return this.pageService.createPage(this.websiteId, page).subscribe((returnPage: Page) => {});
  }

}
