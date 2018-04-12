import { Component, OnInit } from '@angular/core';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute} from '@angular/router';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-website-list',
  templateUrl: './website-list.component.html',
  styleUrls: ['../../../app.component.css']
})
export class WebsiteListComponent implements OnInit {

  userId: String;
  websites = [{_id: '', name: ''}];

  constructor(private websiteService: WebsiteService, private activatedRoute: ActivatedRoute,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        params => {
          return this.websiteService.findWebsiteByUser(this.sharedService.user['_id']).subscribe((returnWebsites: any) => {
            this.userId = this.sharedService.user['_id'];
            this.websites = returnWebsites;
          });
        }
      );
  }
}
