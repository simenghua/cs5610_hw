import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PageService} from '../../../services/page.service.client';
import {Page} from '../../../models/page.model.client';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {

  @ViewChild('f') pageForm: NgForm;
  pageId: String;
  page: Page;
  constructor(private pageService: PageService, private activatedRoute: ActivatedRoute, private router: Router) { }

  update() {
    const new_page = new Page(this.pageId, this.pageForm.value.name, this.page.websiteId, this.pageForm.value.title);
    this.pageService.updatePage(this.pageId, new_page).subscribe(
      (page: Page) => {
        this.page = page;
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      });
  }

  delete() {
    return this.pageService.deletePage(this.pageId).subscribe((returnPage: Page) => {});
  }
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      console.log(params.get('pid'));
      this.pageId = params.get('pid');
      this.pageService.findPageById(this.pageId).subscribe((page: Page) => {
          this.page = page;
        }
      );
    });
  }

}
