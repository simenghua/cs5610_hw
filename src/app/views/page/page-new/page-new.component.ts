import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {PageService} from '../../../services/page.service.client';
import {SharedService} from '../../../services/shared.service';

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
  errorFlag: Boolean;
  errorMsg: String;
  page = {_id: undefined, name: '', title: ''};

  constructor(private pageService: PageService, private activatedRoute: ActivatedRoute,
              private router: Router, private sharedService: SharedService) {
  }

  ngOnInit() {
    this.errorFlag = false;
    this.errorMsg = 'Enter the name of the page';
    this.activatedRoute.params
      .subscribe(
        params => {
          this.userId = this.sharedService.user['_id'];
          this.websiteId = params['wid'];
        }
      );
  }

  newPage() {
    if (this.page.name === '') {
      this.errorFlag = true;
    } else {
      this.pageService.createPage(this.websiteId, this.page)
        .subscribe(
          (data: any) => {
            this.page = data;
           this.router.navigate(['/user', 'website', this.websiteId, 'page']);
           }
        );
    }
    // const page = new Page('', '', this.websiteId, '');
    // page.name = this.pageForm.value.name;
    // page.title = this.pageForm.value.title;
    // return this.pageService.createPage(this.websiteId, page).subscribe((returnPage: Page) => {});
  }

}
