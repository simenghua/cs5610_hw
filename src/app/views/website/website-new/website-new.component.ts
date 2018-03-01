import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../models/user.model.client';
import {Website} from '../../../models/website.model.client';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {
  @ViewChild('f') newWebForm: NgForm;
  user: User;
  userId: String;
  username: String;
  website: Website;
  webId: String;
  webName: String;
  description: String;

  constructor(private webService: WebsiteService,
              private route: ActivatedRoute) { }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['uid'];
    });
  }

  newWebsite() {
    this.webName = this.newWebForm.value.webName;
    this.description = this.newWebForm.value.description;
    const website = new Website(this.webId, this.webName, this.userId, this.description);
    this.webService.createWebsite(this.userId, website);
  }

}
