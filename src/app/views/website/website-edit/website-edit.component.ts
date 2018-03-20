import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Website} from '../../../models/website.model.client';
import {WebsiteService} from '../../../services/website.service.client';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {

  @ViewChild('f') websiteForm: NgForm;
  wid: String;
  website: Website;
  userId: String;
  websites: Website[] = [];
  constructor(private websiteService: WebsiteService, private activatedRoute: ActivatedRoute, private router: Router) { }

  delete() {
    this.websiteService.deleteWebsite(this.wid).subscribe(
      () => this.router.navigate(['../'], {relativeTo: this.activatedRoute}));
  }

  update() {
    if (this.websiteForm.value.webname === '') {
      alert('Please input new web name');
      return;
    }
    this.website.name = this.websiteForm.value.webname;
    this.website.description = this.websiteForm.value.description;
    this.websiteService.updateWebsite(this.wid, this.website).subscribe(
      (website: Website) => {
        this.website = website;
        this.router.navigate(['..'], {relativeTo: this.activatedRoute});
      }
    );
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
        this.websiteService.findWebsiteByUser(this.userId).subscribe(
          (returnwebsites: Website[]) => {
            this.websites = returnwebsites;
          });

        this.wid = params['wid'];
        console.log(this.wid);
        this.websiteService.findWebsiteById(this.wid).subscribe(
          (website: Website) => {
            console.log(website);
            this.website = website;
          }
        );
      });
  }

}
