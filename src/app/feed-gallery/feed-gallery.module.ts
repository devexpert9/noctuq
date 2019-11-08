import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FeedGalleryPage } from './feed-gallery.page';
// import { NgxMasonryModule } from 'ngx-masonry';
// import { MasonryModule } from 'angular2-masonry';
import { NgMasonryGridModule } from 'ng-masonry-grid';
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
    NgMasonryGridModule
	// NgxMasonryModule,
	// MasonryModule 
  ],
  declarations: [FeedGalleryPage]
})
export class FeedGalleryPageModule {}
