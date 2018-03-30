import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {UserService} from './services/user.service.client';
import {routing} from './app.routing';
import {HttpModule} from '@angular/http';
import {QuillEditorModule} from 'ngx-quill-editor';

import {AppComponent} from './app.component';
import {LoginComponent} from './views/user/login/login.component';
import {ProfileComponent} from './views/user/profile/profile.component';
import {RegisterComponent} from './views/user/register/register.component';
import {WebsiteListComponent} from './views/website/website-list/website-list.component';
import {WebsiteNewComponent} from './views/website/website-new/website-new.component';
import {WebsiteEditComponent} from './views/website/website-edit/website-edit.component';
import {PageListComponent} from './views/page/page-list/page-list.component';
import {PageNewComponent} from './views/page/page-new/page-new.component';
import {PageEditComponent} from './views/page/page-edit/page-edit.component';
import {WidgetChooserComponent} from './views/widget/widget-chooser/widget-chooser.component';

import {WidgetListComponent} from './views/widget/widget-list/widget-list.component';
import {APP_BASE_HREF} from '@angular/common';
import {WebsiteService} from './services/website.service.client';
import {PageService} from './services/page.service.client';
import {WidgetService} from './services/widget.service.client';
import { WidgetEditComponent } from './views/widget/widget-edit/widget-edit.component';
import {WidgetHeadingComponent} from './views/widget/widget-edit/widget-heading/widget-heading.component';
import {WidgetImageComponent} from './views/widget/widget-edit/widget-image/widget-image.component';
import {WidgetYoutubeComponent} from './views/widget/widget-edit/widget-youtube/widget-youtube.component';
import { WebdvSortableDirective } from './views/widget/widget-list/webdv-sortable.directive';
import { WidgetTextComponent } from './views/widget/widget-edit/widget-text/widget-text.component';
import { WidgetHtmlComponent } from './views/widget/widget-edit/widget-html/widget-html.component';
import { FlickrImageSearchComponent } from './views/widget/widget-edit/widget-image/flickr-image-search/flickr-image-search.component';
import {FlickrService} from './services/flickr.service.client';
import {OrderByPipe} from './views/widget/widget-list/order-by-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    WebsiteListComponent,
    WebsiteNewComponent,
    WebsiteEditComponent,
    PageListComponent,
    PageNewComponent,
    PageEditComponent,
    WidgetHeadingComponent,
    WidgetImageComponent,
    WidgetListComponent,
    WidgetYoutubeComponent,
    WidgetChooserComponent,
    WidgetEditComponent,
    WebdvSortableDirective,
    WidgetTextComponent,
    WidgetHtmlComponent,
    FlickrImageSearchComponent,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule,
    QuillEditorModule
  ],
  providers: [UserService, WebsiteService, PageService, WidgetService, FlickrService, {provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
