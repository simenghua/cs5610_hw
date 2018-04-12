import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../../../services/widget.service.client';
import {FlickrService} from '../../../../../services/flickr.service.client';
import {SharedService} from '../../../../../services/shared.service';


@Component({
  selector: 'app-flickr-image-search',
  templateUrl: './flickr-image-search.component.html',
  styleUrls: ['./flickr-image-search.component.css']
})
export class FlickrImageSearchComponent implements OnInit {

  websiteId: string;
  pageId: string;
  userId: string;
  widgetId: String;
  widget = {type: 'Image', name: ''};
  photos: [any] = [{photo: ''}];
  errorMsg: string;
  errorFlag: boolean;
  searchText: string;

  constructor(private flickrService: FlickrService,
              private widgetService: WidgetService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private sharedService: SharedService) { }

  ngOnInit() {
    this.errorFlag = false;
    this.errorMsg = 'Enter the name of the widget';
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.websiteId = params['wid'];
          this.pageId = params['pid'];
          this.widgetId = params['wgid'];
          this.userId = this.sharedService.user['_id'];
        }
      );
  }

  searchPhotos() {
      this.flickrService
        .searchPhotos(this.searchText)
        .subscribe(
          (data: any) => {
            let val = data._body;
            val = val.replace('jsonFlickrApi(', '');
            val = val.substring(0, val.length - 1);
            val = JSON.parse(val);
            this.photos = val.photos;
          }
        );
  }

  selectPhoto(photo) {
    let url = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server;
    url += '/' + photo.id + '_' + photo.secret + '_b.jpg';
    console.log(url);
    const widget = {
      type: 'Image',
      websiteId : this.websiteId,
      pageId : this.pageId,
      url: url
    };
    console.log(this.widgetId);
    if (this.widgetId !== 'undefined') {
      this.widgetService.updateWidget(this.widgetId, widget).subscribe(
          (data: any) => {
            const result = data;
            if (result) { this.router.navigate(
              ['/user/' + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget/' + this.widgetId]);
            } else {
              this.errorMsg = 'failed!';
            }
          }
        );
    } else {
      this.widgetService.createWidget(this.pageId, widget).subscribe((returnWidget: any) => {
        this.widget = returnWidget;
        this.widgetId = returnWidget._id;
        console.log(this.widget);
        this.router.navigate(
          ['/user/' + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget/' + this.widgetId]);
      });
    }
  }
}
