import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../models/user.model.client';
import {Website} from '../../../models/website.model.client';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {WebsiteService} from '../../../services/website.service.client';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {
  @ViewChild('f') editForm: NgForm;
  userId: String;
  username: String;
  website: Website;
  webId: String;
  websites: Website[] = [];
  webName: String;
  description: String;

  constructor(private webService: WebsiteService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // alert('userId is' + this.userId);
      this.webId = params['wid'];
      this.userId = params['uid'];
      this.website = this.webService.findWebsitesById(this.webId);
    });

    this.websites = this.webService.findWebsitesByUser(this.userId);
  }

  updateWebsite() {
    if (this.editForm.value.name !== '') {
      this.website.name = this.editForm.value.webName;
    }
    if (this.editForm.value.description !== '') {
      this.website.description = this.editForm.value.description;
    }
    this.webService.updateWebsite(this.webId, this.website);
  }

  deleteWebsite() {
    this.webService.deleteWebsite(this.webId);
  }

}
