import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WebsiteService} from '../../../services/website.service.client';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {

  @ViewChild('f') websiteForm: NgForm;
  errorFlag: Boolean;
  error: String;
  wid: String;
  website: {_id: '', name: '', description: '', developmentId: ''};
  userId: String;
  name: String;
  websites: [{_id: '', name: ''}];
  constructor(private websiteService: WebsiteService, private activatedRoute: ActivatedRoute, private router: Router) { }

  delete() {
    this.websiteService.deleteWebsite(this.wid).subscribe(
      (data: any) => this.router.navigate(['/user', this.userId, 'website'])
    );
  }

  update() {
    if (this.websiteForm.value.webname === '') {
      this.errorFlag = true;
      return;
    }
    this.website.name = this.websiteForm.value.webname;
    this.website.description = this.websiteForm.value.description;
    this.websiteService.updateWebsite(this.wid, this.website).subscribe(
      (website: any) => {
        this.website = website;
        this.router.navigate(['/user', this.userId, 'website']);
      }
    );
  }

  ngOnInit() {
    this.errorFlag = false;
    this.error = 'Enter the name of the website';
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['uid'];
        this.websiteService.findWebsiteByUser(this.userId).subscribe(
          (returnwebsites: any) => {
            this.websites = returnwebsites;
          });

        this.wid = params['wid'];
        this.websiteService.findWebsiteById(this.wid).subscribe(
          (website: any) => {
            this.website = website;
          }
        );
      });
  }

}
