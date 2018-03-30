import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WebsiteService} from '../../../services/website.service.client';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {
  userId: String;
  user = {};
  websites: [{_id: '', name: ''}];
  website = {name: '', description: '', developmentId: ''};
  errorFlag: Boolean;
  error: String;

  constructor(private websiteService: WebsiteService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  newWebsite() {
    if (this.website.name === '') {
      this.errorFlag = true;
    } else {
      this.websiteService.createWebsite(this.userId, this.website)
        .subscribe(
          (data: any) => {
            this.website = data;
            this.router.navigate(['user', this.userId, 'website']);
          },
          (error: any) => console.log(error)
        );
    }
    // const new_website = new Website(undefined, this.webForm.value.webname, this.userId, this.webForm.value.description);
    // this.websiteService.createWebsite(this.userId, new_website).subscribe(
    //   (returnWebsite: Website) => {
    //     console.log(returnWebsite);
    //     this.router.navigate(['../'], {relativeTo: this.activatedRoute});
    //   }
    // );
  }

  ngOnInit() {
    this.errorFlag = false;
    this.error = 'Enter the name of the website';
    this.activatedRoute.params.subscribe(
      params => {
        this.websiteService.findWebsiteByUser(params['uid']).subscribe(
          (returnWebsites: any) => {
            this.userId = params['uid'];
            this.websites = returnWebsites;
          });
      }
    );
  }

}
