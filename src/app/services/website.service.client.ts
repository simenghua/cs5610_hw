import { Website } from '../models/website.model.client';
import {Injectable} from '@angular/core';


@Injectable()
export class WebsiteService {

  websites: Website[] = [
    new Website('123', 'Facebook', '456', 'test' ),
    new Website('234', 'Tweeter', '456', 'test' ),
    new Website('456', 'Gizmodo', '456', 'test' ),
    new Website('567', 'Go', '234', 'test' ),
    new Website('678', 'Twitter', '234', 'test' ),
    new Website('789', 'Amazon', '123', 'test' ),
  ];

  createWebsite(userId: String, website: Website) {

    const new_website = {
      _id: (new Date()).getTime() + '',
      name: website.name,
      developId: website.developId,
      description: website.description
    };

    this.websites.push(new_website);
  }

  findWebsitesByUser(userId: String) {
    const resultSet = [];
    for ( const i in this.websites) {
      if (this.websites[i].developId === userId) {
        resultSet.push(this.websites[i]);
      }
    }
    return resultSet;
  }

  findWebsitesByUser2(userId: String) {
    return this.websites.filter(function (website) {
      return website.developId === userId;
    });
  }

  findWebsitesById(websiteId: String) {
    return this.websites.find(function (website) {
      return website._id === websiteId;
    });
  }

  updateWebsite(websiteId: String, website: Website) {
    for (const i in this.websites) {
      if (this.websites[i]._id === websiteId) {
        this.websites[i].name = website.name;
        this.websites[i].description = website.description;
      }
    }
  }

  deleteWebsite(websiteId: String) {
    for (const i in this.websites) {
      if (this.websites[i]._id === websiteId) {
        const j = +i;
        this.websites.splice(j, 1);
      }
    }
  }
}
