import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';

import { FeedGalleryPage } from './feed-gallery.page';
// import { NgxMasonryModule } from 'ngx-masonry';
// import { MasonryModule } from 'angular2-masonry';
import { NgMasonryGridModule } from 'ng-masonry-grid';
import { LightboxModule } from 'ngx-lightbox';
const routes: Routes = [
  {
    path: '',
    component: FeedGalleryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgMasonryGridModule,
    SharedModule,
    LightboxModule
	// NgxMasonryModule,
	// MasonryModule 
  ],
  declarations: [FeedGalleryPage]
})
export class FeedGalleryPageModule {}
